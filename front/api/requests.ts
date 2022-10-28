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
    id?: number;
    searchQuery?: string;
    categoryName?: string;
  }
): Promise<{ articles: Article[]; len: number }> {
  let queryString = '';

  if (queries && queries.id) queryString += `id=${queries.id}&`;
  if (queries && queries.searchQuery)
    queryString += `searchQuery=${queries.searchQuery}&`;
  if (queries && queries.categoryName)
    queryString += `categoryName=${queries.categoryName}&`;

  const list = (await api.get(`api/article/${type}?${queryString}page=${page}`))
    .data;

  return { articles: list, len: list.length };
}

export async function getArticleDetailApi(
  type: string,
  id: string
): Promise<string> {
  const contents = (await api.get(`api/article/${type}/${id}`)).data;

  return contents;
}

export async function searchArticleListApi(
  type: string,
  searchWord: string,
  page = 1
): Promise<{ articles: Article[]; cnt: number }> {
  const respone = await api.get(`api/${type}/search/${searchWord}/${page}`);

  let articles = null;

  if (type === 'post') articles = respone.data.data.posts;
  else articles = respone.data.data.notes;

  return { articles, cnt: respone.data.data.cnt };
}
