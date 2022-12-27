import { Block } from '../../types/notion_api_types';
import { getBlocks } from './getBlocks';
import { getChildrenOfBlock } from './getChildrenOfBlock';
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
      if (block.type === 'child_page') return block;

      await blockProcessor(block);

      const result = await getChildrenOfBlock(
        block,
        depth + depthConvertor(block)
      );

      if (!result.has_children) result.chilren = [];
      result.depth = depth;

      return result;
    })
  );

  if (nextCursor === null) return blocksWithChildren;
  blocksWithChildren.push(...(await getAllBlocks(blockId, 0, nextCursor)));

  return blocksWithChildren;
};

const depthConvertor = (block: Block) => {
  switch (block.type) {
    case 'quote':
    case 'toggle':
    case 'column':
      return 0;
    default:
      return 1;
  }
};

const blockProcessor = async (block: Block) => {
  if (block.type === 'image')
    block.image.file.url = await imageDownloader(block.image.file.url);
};
