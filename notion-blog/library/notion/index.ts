import { Client } from '@notionhq/client';
import { getPage } from './getPage';
import { getAllBlocks } from './getAllBlocks';

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN,
});

export { getPage, getAllBlocks };
