import { createContext, useState } from 'react';
import { getCategoryListApi } from '../api/requests';
import { Category } from '../types';

interface ValueType {
  category: Category[];
  updateCategory: (type: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export const categoryContext = createContext<ValueType | null>(null);

export default function CategoryProvider({ children }: Props) {
  const [category, setCategory] = useState<Category[]>([]);

  const updateCategory = async (type: string) => {
    try {
      const response = await getCategoryListApi(type);
      setCategory(response);
      return true;
    } catch {
      return false;
    }
  };

  const value = { category, updateCategory };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
}
