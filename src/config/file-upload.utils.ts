import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('¡Solo se permiten archivos de imagen!'), false);
  }
  callback(null, true);
};

export const importFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx)$/)) {
    return callback(new Error('¡Solo se permiten archivos en formato .xlsx!'), false);
  }
  callback(null, true);
};

export const exportFileName = (req, file, callback) => {
  const name = 'import_products';
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
