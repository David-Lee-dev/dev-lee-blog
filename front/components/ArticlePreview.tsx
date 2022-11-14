import Link from 'next/link';

import { Article } from '../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

export default function ArticlePreview({ article, type }: Props) {
  return (
    <Card>
      <Link href={`/article/${type}/detail/${article.id}`}>
        <a>
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
                width="200"
                height="200"
                image={
                  article.thumbnail
                    ? `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}api/images/${article.thumbnail}`
                    : `/default_thumbnail.png`
                }
                alt="default image"
              />
            </Grid>
            <Grid xs={9} item>
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
