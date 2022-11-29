import { Block, Page } from '../../types/notion_api_types';
import { getBlock } from './getBlock';
import { getPage } from './getPage';

export const getBlockPath = async (notionOjbect: Page | Block): Promise<Page[]> => {
  if (notionOjbect.id === process.env.NEXT_NOTION_DATABASE_ID) return [];

  if (notionOjbect.parent.type === 'block_id') {
    const parentBlock = (await getBlock(notionOjbect.parent.block_id)) as Block;
    return [...(await getBlockPath(parentBlock))];
  } else if (notionOjbect.parent.type === 'page_id') {
    const parentPage = (await getPage(notionOjbect.parent.page_id)) as Page;
    return [notionOjbect as Page, ...(await getBlockPath(parentPage))];
  }

  return [];
};
