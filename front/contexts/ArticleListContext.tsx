import { createContext, useCallback, useState } from 'react';

import { Article, defaultArticle } from '../types';

interface ValueType {
  articles: Article[];
  updateArticle: (articles: Article[]) => void;
}

interface Props {
  children: React.ReactNode;
}

export const articleContext = createContext<ValueType>({
  articles: [defaultArticle],
  updateArticle: (articles: Article[]) => {},
});

export default function ArticleProvider({ children }: Props) {
  const [articles, setArticle] = useState<Article[]>([]);
  const updateArticle = useCallback(
    (articles: Article[]) => setArticle(articles),
    []
  );
  const value = { articles, updateArticle };

  return (
    <articleContext.Provider value={value}>{children}</articleContext.Provider>
  );
}
