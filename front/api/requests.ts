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
  return respone.data.data.posts;
}
