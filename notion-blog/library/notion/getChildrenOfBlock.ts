import { getAllBlocks } from './getAllBlocks';

export const getChildrenOfBlock = async (block: any, depth: number) => {
  if (block.has_children === true) {
    const children = await getAllBlocks(block.id, depth);
    block.depth = depth;
    block.children = await getChildrenOfBlock(children, depth + 1);
  }

  return block;
};
