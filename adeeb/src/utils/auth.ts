import jwt from 'jsonwebtoken';
import { JWT_PUBLIC } from '../config';

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    JWT_PUBLIC as string,
    { algorithms: ['RS256'] },
    // function (err, payload) {
    // if token alg != RS256,  return err == invalid signature
    // }
  );
  return decoded;
};
