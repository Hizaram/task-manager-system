import { sign } from 'jsonwebtoken';

const generateJWToken = (userId) => {
  const token = sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export default generateJWToken;
