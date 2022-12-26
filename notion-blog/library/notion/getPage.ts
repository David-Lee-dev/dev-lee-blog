import { notion } from '.';
import { preventOverRate } from './preventOverRate';

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });

  return response;
};
