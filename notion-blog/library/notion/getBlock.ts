import { notion } from '.';
import { preventOverRate } from './preventOverRate';

export const getBlock = async (blockId: string) => {
  const response = await notion.blocks.retrieve({ block_id: blockId });

  return response;
};
