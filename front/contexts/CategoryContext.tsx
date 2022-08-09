import { createContext, useCallback, useState } from 'react';
import { Category, defaultCategory } from '../types';

interface ValueType {
  category: Category[];
  updateCategory: (category: Category[]) => void;
}

interface Props {
  children: React.ReactNode;
}

export const categoryContext = createContext<ValueType>({
  category: [defaultCategory],
  updateCategory: (category: Category[]) => {},
});

export default function CategoryProvider({ children }: Props) {
  const [category, setCategory] = useState<Category[]>([]);

  const updateCategory = useCallback((category: Category[]) => {
    setCategory([defaultCategory, ...category]);
  }, []);

  const value = { category, updateCategory };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
}
