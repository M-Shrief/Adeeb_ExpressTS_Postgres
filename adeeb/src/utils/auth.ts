import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_PRIVATE, JWT_PUBLIC } from '../config';

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(); // default 10
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (raw: string, hash: string) =>
  await bcrypt.compare(raw, hash);

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
