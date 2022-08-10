import { createContext, useCallback, useState } from 'react';

import { Category, defaultCategory } from '../types';

interface ValueType {
  category: Category[];
  selected: number;
  updateCategory: (category: Category[]) => void;
  changeSelectedCatetory: (id: number) => void;
}

interface Props {
  children: React.ReactNode;
}

export const categoryContext = createContext<ValueType>({
  category: [defaultCategory],
  selected: -1,
  updateCategory: (category: Category[]) => {},
  changeSelectedCatetory: (id: number) => {},
});

export default function CategoryProvider({ children }: Props) {
  const [category, setCategory] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number>(-1);

  const updateCategory = useCallback((category: Category[]) => {
    setCategory([defaultCategory, ...category]);
  }, []);

  const changeSelectedCatetory = useCallback(
    (id: number) => setSelected(id),
    []
  );

  const value = { selected, category, updateCategory, changeSelectedCatetory };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
}
