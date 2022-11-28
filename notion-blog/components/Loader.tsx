import { HashLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-zinc-700/50 flex justify-center items-center z-100 backdrop-blur-sm">
      <HashLoader></HashLoader>
    </div>
  );
};

export default Loader;
