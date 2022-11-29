import { Block, Page } from '../../types/notion_api_types';
import { getBlock } from './getBlock';
import { getPage } from './getPage';

export const getBlockPath = async (notionOjbect: Page | Block): Promise<Page[]> => {
  if (notionOjbect.id === process.env.NEXT_NOTION_DATABASE_ID) return [];

  const result = [];
  if (notionOjbect.object === 'page') result.push(notionOjbect);

  let nextObject = Object();
  switch (notionOjbect.parent.type) {
    case 'block_id':
      nextObject = (await getBlock(notionOjbect.parent.block_id)) as Block;
      break;
    case 'page_id':
      nextObject = (await getPage(notionOjbect.parent.page_id)) as Page;
      break;
  }

  return [...(await getBlockPath(nextObject)), ...result];
};
