import { useRouter } from 'next/router';
import SideMenu from '../components/SideMenu';

export default function Note() {
  const pathname = useRouter().pathname.split('?')[0];

  return (
    <>
      {(pathname === '/post' || pathname === '/note') && (
        <SideMenu
          type={`${pathname === '/post' ? 'post' : ''}${
            pathname === '/note' ? 'note' : ''
          }`}
        />
      )}
    </>
  );
}
