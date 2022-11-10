export interface Category {
  id: number;
  name: string;
  type: string;
}

export const defaultCategory = {
  id: -1,
  name: 'all',
};

export interface Article {
  category: Category;
  contents: string;
  createdTime: string;
  id: number;
  images: string[];
  tags: string[];
  title: string;
  type: string;
}

export const defaultArticle = {
  category: {
    id: -1,
    name: '',
    type: '',
  },
  contents: '',
  createdTime: '',
  id: -1,
  images: [],
  tags: [],
  title: '',
  type: '',
};
