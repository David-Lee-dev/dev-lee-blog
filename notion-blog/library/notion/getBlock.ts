import { notion } from '.';

export const getBlock = async (blockId: string) => {
  const response = await notion.blocks.retrieve({ block_id: blockId });
  return response;
};
