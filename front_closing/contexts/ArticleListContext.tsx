import { createContext, useCallback, useState } from 'react';

import { Article, defaultArticle } from '../types';

interface ValueType {
  articles: Article[];
  updateArticle: (articles: Article[]) => void;
  pages: number;
  updatePages: (cnt: number) => void;
}

interface Props {
  children: React.ReactNode;
}

export const articleContext = createContext<ValueType>({
  articles: [defaultArticle],
  updateArticle: (articles: Article[]) => {},
  pages: 0,
  updatePages: (count: number) => {},
});

export default function ArticleProvider({ children }: Props) {
  const [articles, setArticle] = useState<Article[]>([]);
  const [pages, setPageCount] = useState<number>(1);

  const updateArticle = useCallback(
    (articles: Article[]) => setArticle(articles),
    []
  );

  const updatePages = useCallback((count: number) => {
    setPageCount(count);
  }, []);
  const value = { articles, updateArticle, pages, updatePages };

  return (
    <articleContext.Provider value={value}>{children}</articleContext.Provider>
  );
}
