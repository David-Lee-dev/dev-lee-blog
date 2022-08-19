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
): Promise<Article[]> {
  const respone = await api.get(`api/${type}/list/${category}/${page}`);

  if (type === 'post') return respone.data.data.posts;
  return respone.data.data.notes;
}

export async function getArticleDetailApi(
  type: string,
  id: string
): Promise<Article> {
  const respone = await api.get(`api/${type}/detail/${id}`);
  return respone.data.data[type];
}
