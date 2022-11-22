import Link from 'next/link';

import { Article } from '../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function ArticlePreview({ article, type }: Props) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <Link href={`/article/${type}/detail/${article.id}`}>
        <a>
          <Grid
            sx={{
              display: 'flex',
            }}
            container
            spacing={2}
          >
            <Grid lg={2.5} md={3} sm={2} xs={3.5} item>
              <MyCardMedia
                src={
                  article.thumbnail
                    ? `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}api/images/${article.thumbnail}`
                    : `/default_thumbnail.png`
                }
              />
            </Grid>
            <Grid lg={9.5} md={9} sm={10} xs={8.5} item>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '8px !important',
                }}
              >
                <MyH6>{article.title}</MyH6>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    sx={{
                      marginTop: 2,
                    }}
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
                    sx={{
                      marginTop: 1,
                    }}
                  >
                    {article.createdTime}
                  </Typography>
                </Box>
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

const MyCardMedia = styled('img')(({ theme }) => ({
  display: 'block',
  WebkitBackgroundSize: 'cover',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  WebkitBackgroundPosition: 'center',
  backgroundPosition: 'center',
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '120px',
    height: '120px',
  },
  [theme.breakpoints.up('md')]: {
    width: '150px',
    height: '150px',
  },
}));

const MyH6 = styled('h6')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Spoqa Han Sans Neo,sans-serif',
  marginBottom: '0.35em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('md')]: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
  },
  [theme.breakpoints.up('md')]: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
  },
  [theme.breakpoints.up('lg')]: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '25px',
  },
}));
