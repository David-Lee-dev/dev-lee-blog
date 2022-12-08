import { ImageBlock } from '../../types/notion_api_types';
import RichTexts from '../RichTexts';

interface ImageProps {
  block: ImageBlock;
}

const NotionImage: React.FC<ImageProps> = ({ block }: ImageProps) => {
  return (
    <>
      <div className={`flex justify-center pt-4`}>
        <img src={`/${block.image.file.url}`} alt={'image'} />
        {/* <img src={block.image.file.url} alt={'image'} /> */}
      </div>
      <div className="flex justify-center pb-4 text-gray-400">
        <RichTexts richTexts={block.image.caption} />
      </div>
    </>
  );
};

export default NotionImage;
