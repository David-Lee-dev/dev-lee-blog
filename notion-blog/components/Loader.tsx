import { HashLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center z-100 backdrop-blur-[2px]">
      <HashLoader></HashLoader>
    </div>
  );
};

export default Loader;
