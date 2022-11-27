import Image from 'next/image';
import { ImageBlock } from '../../types/notion_api_types';

interface ImageProps {
  block: ImageBlock;
}

const NotionImage: React.FC<ImageProps> = ({ block }: ImageProps) => {
  return (
    <div>
      <Image src={block.image.file.url} width={500} height={500} alt={'image'} />
    </div>
  );
};

export default NotionImage;
