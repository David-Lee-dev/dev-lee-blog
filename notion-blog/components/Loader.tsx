import { HashLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-screen fixed flex justify-center items-center z-100 backdrop-blur-[2px]">
      <HashLoader></HashLoader>
    </div>
  );
};

export default Loader;
