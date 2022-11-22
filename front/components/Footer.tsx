import Link from 'next/link';

import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';

export default function Footer() {
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText('aganga7427@gmail.com');

      alert('메일 주소가 클립보드에 복사되었습니다.');
    } catch (error) {
      alert('복사할 수 없습니다.');
    }
  };

  return (
    <Typography
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '150px',
      }}
      bgcolor="secondary.light"
    >
      <Link href="https://github.com/David-Lee-dev">
        <a target="_blank">
          <img src="/github.svg" style={{ width: '25px', margin: '0 10px' }} />
        </a>
      </Link>
      <MailIcon
        fontSize="large"
        sx={{ width: 40, margin: '0 10px', cursor: 'pointer' }}
        onClick={handleCopyClipBoard}
      />
    </Typography>
  );
}
