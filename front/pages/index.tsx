import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

export default function Home() {
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText('aganga7427@gmail.com');

      alert('메일 주소가 클립보드에 복사되었습니다.');
    } catch (error) {
      alert('복사할 수 없습니다.');
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid item xl={3} lg={2.5} md={2}></Grid>
      <Grid
        item
        xl={6}
        lg={7}
        md={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          padding: '0 10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: 2,
          }}
        >
          <Avatar
            alt="dev lee"
            src="/profile.png"
            sx={{ width: 50, height: 50, margin: 2 }}
          />
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            Dev Lee&#39;s SITE
          </Typography>
        </Box>
        <MyHeader>About Me</MyHeader>
        <Typography>개발 공부 중인 개발 지망생입니다</Typography>
        <Typography
          sx={{
            marginTop: 1,
            fontSize: 12,
          }}
        >
          <Link href="https://github.com/David-Lee-dev">
            <a
              style={{ textDecoration: 'underline', color: '#1D928E' }}
              target="_blank"
            >
              &#62;&#62;Github
            </a>
          </Link>
          <Typography
            sx={{
              fontSize: 12,
              textDecoration: 'underline',
              marginLeft: 1,
              cursor: 'pointer',
              color: 'info.main',
            }}
            component="span"
            onClick={handleCopyClipBoard}
          >
            &#62;&#62;Mail
          </Typography>
        </Typography>
        <MyHeader>About Blog</MyHeader>
        <Typography>공부하는 것을 작성하고 있는 블로그입니다</Typography>
        <Typography>
          <Link href="/article/post">
            <MyAnchor>POST</MyAnchor>
          </Link>
          &#58; 직접 개발하면서 배운 것들을 공유하고 있습니다
        </Typography>
        <Typography>
          <Link href="/article/note">
            <MyAnchor>NOTE</MyAnchor>
          </Link>
          &#58; 강의를 듣거나 책을 보고 배운 내용을 정리하고 있습니다
        </Typography>
      </Grid>
      <Grid item xl={3} lg={2.5} md={2}></Grid>
    </Grid>
  );
}

const MyHeader = styled('h1')(() => ({
  fontSize: 22,
  fontWeight: 800,
  margin: '20px 0',
}));

const MyAnchor = styled('a')(({ theme }) => ({
  'color': theme.palette.info.main,
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));
