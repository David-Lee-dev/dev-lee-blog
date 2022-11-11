import { useContext } from 'react';
import Link from 'next/link';

import { Article } from '../types';
import { categoryContext } from '../contexts/CategoryContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ArticlePreview({ article, type }: Props) {
  const { changeSelectedCatetory } = useContext(categoryContext);

  return (
    <Card>
      <Link href={`/article/${type}/detail/${article.id}`}>
        <a onClick={() => changeSelectedCatetory(article.category.id)}>
          <Grid
            sx={{
              display: 'flex',
            }}
            container
            spacing={2}
          >
            <Grid xs={3} item>
              <CardMedia
                component="img"
                height="200"
                image="/default_thumbnail.png"
                alt="default image"
              />
            </Grid>
            <Grid item>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  {article.tags.map((tag, idx) => (
                    <Chip
                      key={`${idx}--${tag}`}
                      label={tag}
                      sx={{ marginRight: 1 }}
                    ></Chip>
                  ))}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 3 }}
                >
                  {article.createdTime}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </a>
      </Link>
    </Card>
  );
}

interface Props {
  article: Article;
  type: string;
}
