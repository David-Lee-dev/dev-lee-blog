import { notion } from '.';
import { Page, ParentPage } from '../../types/notion_api_types';

export const getBlockPath = async (pageId: string): Promise<Page[]> => {
  const response: Page = (await notion.pages.retrieve({ page_id: pageId })) as Page;

  if (response.id === process.env.NEXT_NOTION_DATABASE_ID) return [response];

  return [...(await getBlockPath((response.parent as ParentPage).page_id)), response];
};
