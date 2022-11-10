import { Article, Category } from '../types';
import { axiosInstance } from './index';

const api = axiosInstance;

export async function getCategoryListApi(type: string): Promise<Category[]> {
  const categories = (await api.get(`api/category/${type}`)).data;

  return categories;
}

export async function getArticleListApi(
  type: string,
  page = 1,
  queries?: {
    categoryId?: number;
    searchQuery?: string;
  }
): Promise<{ articles: Article[]; len: number }> {
  let queryString = '';

  if (queries && queries.searchQuery)
    queryString += `queryString=${queries.searchQuery}&`;
  if (queries && queries.categoryId)
    queryString += `categoryId=${
      queries.categoryId > 0 ? queries.categoryId : ''
    }&`;

  const list = (
    await api.get(`api/article?type=${type}&${queryString}page=${page}`)
  ).data;

  return { articles: list, len: list.length };
}

export async function getArticleDetailApi(id: string): Promise<string> {
  const contents = (await api.get(`api/article/${id}`)).data;

  return contents;
}
