import { useMemo } from 'react';

interface ListWrapperType {
  children: React.ReactNode;
  type: string;
  depth: number | undefined;
}

const Wrapper: React.FC<ListWrapperType> = ({ children, type, depth }: ListWrapperType) => {
  const check = useMemo(() => {
    if (depth && depth > 0) return 'no-wrap';
    else if (type === 'bulleted_list_item') return 'ul';
    else if (type === 'numbered_list_item') return 'ol';
    else return 'no-wrap';
  }, []);

  switch (check) {
    case 'ul':
      return <ul>{children}</ul>;
    case 'ol':
      return <ol>{children}</ol>;
    default:
      return <>{children}</>;
  }
};

export default Wrapper;
