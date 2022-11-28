import { notion } from '.';
import { Block } from '../../types/notion_api_types';

export const getBlocks = async (blockId: string, { cursor, page }: { cursor?: string; page?: number }) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: cursor,
    page_size: page ?? 100,
  });
  return {
    blocks: response.results as Block[],
    nextCursor: response.next_cursor,
  };
};
