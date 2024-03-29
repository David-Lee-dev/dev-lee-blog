import { LIST } from './id_list';

export const pageIdList = LIST;

export const idSplitter = (id: string) => {
  return (
    `${id.slice(0, 8)}-` +
    `${id.slice(8, 12)}-` +
    `${id.slice(12, 16)}-` +
    `${id.slice(16, 20)}-` +
    `${id.slice(20, 32)}`
  );
};
