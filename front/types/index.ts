export interface Category {
  id: number;
  name: string;
  type: string;
}

export const defaultCategory = {
  id: -1,
  name: 'all',
  type: '',
};

export interface Article {
  contents: string;
  createdTime: string;
  id: number;
  thumbnail: string;
  tags: string[];
  title: string;
  type: string;
}

export const defaultArticle = {
  contents: '',
  createdTime: '',
  id: -1,
  thumbnail: '',
  tags: [],
  title: '',
  type: '',
};
