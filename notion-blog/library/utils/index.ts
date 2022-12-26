import path from 'path';
import downloader from 'image-downloader';

const PATH: string = path.resolve('./public');
const getImagePathFromUrl = (url: string) =>
  `${url.slice(0, url.indexOf('?')).split('/').slice(4).join('')}`;

export const imageDownloader = async (url: string) => {
  const fileName = getImagePathFromUrl(url);
  const options = { url, dest: `${PATH}/${fileName}` };

  await downloader.image(options);

  return fileName;
};
