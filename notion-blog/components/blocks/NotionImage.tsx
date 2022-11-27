import { ImageBlock } from '../../types/notion_api_types';

interface ImageProps {
  block: ImageBlock;
}

const NotionImage: React.FC<ImageProps> = ({ block }: ImageProps) => {
  return (
    <div className="flex justify-center">
      <img src={block.image.file.url} alt={'image'} />
    </div>
  );
};

export default NotionImage;
