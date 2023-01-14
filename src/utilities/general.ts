import { Hasher } from './hasher';

export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return Hasher.compare(password, hash);
};
