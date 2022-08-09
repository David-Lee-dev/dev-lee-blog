export interface Category {
  id: number;
  name: string;
}

export const defaultCategory = {
  id: -1,
  name: 'all',
};

export interface Article {
  id: number;
  title: string;
  contents_url: string;
  tags: string;
  created_at: string;
  category: Category;
  contents: string;
}

export const defaultArticle = {
  id: -1,
  title: '',
  contents_url: '',
  tags: '',
  created_at: '',
  category: defaultCategory,
  contents: '',
};
