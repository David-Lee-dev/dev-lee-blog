import { Block } from '../../types/notion_api_types';
import { getBlocks } from './getBlocks';
import { getChildrenOfBlock } from './getChildrenOfBlock';

export const getAllBlocks = async (blockId: string, depth: number, cursor?: string) => {
  const { blocks, nextCursor } = await getBlocks(blockId, { cursor, page: 100 });

  const blocksWithChildren = await Promise.all(
    blocks.map(async (block) => {
      const result = await getChildrenOfBlock(block, depth + depthConvertor(block));
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
