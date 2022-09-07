import { Article, Category } from '../types';
import { axiosInstance } from './index';

const api = axiosInstance;

export async function getCategoryListApi(type: string): Promise<Category[]> {
  const respone = await api.get(`api/${type}/category/`);
  return respone.data.data.category;
}

export async function getArticleListApi(
  type: string,
  category: string,
  page = 1
): Promise<{ articles: Article[]; cnt: number }> {
  const respone = await api.get(`api/${type}/list/${category}/${page}`);

  let articles = null;

  if (type === 'post') articles = respone.data.data.posts;
  else articles = respone.data.data.notes;

  return { articles, cnt: respone.data.data.cnt };
}

export async function getArticleDetailApi(
  type: string,
  id: string
): Promise<Article> {
  const respone = await api.get(`api/${type}/detail/${id}`);
  return respone.data.data[type];
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
