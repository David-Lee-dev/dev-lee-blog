import { Block, Page } from '../../types/notion_api_types';
import { getBlocks } from './getBlocks';
import { getChildrenOfBlock } from './getChildrenOfBlock';
import { getPage } from './getPage';
import { imageDownloader } from '../utils';

export const getAllBlocks = async (
  blockId: string,
  depth: number,
  cursor?: string
) => {
  const { blocks, nextCursor } = await getBlocks(blockId, {
    cursor,
    page: 100,
  });

  const blocksWithChildren = await Promise.all(
    blocks.map(async (block) => {
      if (block.type === 'child_page') {
        // block.icon = ((await getPage(block.id)) as Page).icon;
        // block.depth = depth;
        // if (block.icon && block.icon.type === 'file') block.icon.file.url = await imageDownloader(block.icon.file.url);
        return block;
      }

      if (block.type === 'image')
        block.image.file.url = await imageDownloader(block.image.file.url);

      const result = await getChildrenOfBlock(
        block,
        depth + depthConvertor(block)
      );
      result.depth = depth;
      if (!result.has_children) result.chilren = [];

      return result;
    })
  );

  if (nextCursor === null) return blocksWithChildren;
  blocksWithChildren.push(...(await getAllBlocks(blockId, 0, nextCursor)));

  return blocksWithChildren;
};

function depthConvertor(block: Block) {
  switch (block.type) {
    case 'quote':
    case 'column':
      return 0;
    default:
      return 1;
  }
}
