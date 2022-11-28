import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export default function HideOnSmallWindowBox({ children }: Props) {
  return <StyledBox>{children}</StyledBox>;
}

interface Props {
  children: React.ReactNode;
}
