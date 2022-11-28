import { createContext, useCallback, useState } from 'react';
import { getCategoryListApi } from '../api/requests';

import { Category, defaultCategory } from '../types';

interface ValueType {
  category: Category[];
  updateCategory: (type: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export const categoryContext = createContext<ValueType>({
  category: [defaultCategory],
  updateCategory: (category: string) => {},
});

export default function CategoryProvider({ children }: Props) {
  const [category, setCategory] = useState<Category[]>([]);

  const updateCategory = useCallback(async (type: string) => {
    const response = await getCategoryListApi(type);
    setCategory([defaultCategory, ...response]);
  }, []);

  const value = { category, updateCategory };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
}
