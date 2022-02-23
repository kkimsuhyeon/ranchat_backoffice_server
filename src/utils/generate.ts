import jwt from 'jsonwebtoken';

export const encodeToken = (id: string) => {
  return jwt.sign({ id }, 'secret');
};
