import { Address } from 'src/types';
export interface CreateUserDto {
  name: string;
  username: string;
  phone: string;
  address?: Address;
  password: string;
}
