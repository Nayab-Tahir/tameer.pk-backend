import { Types } from 'mongoose';
import { Address } from 'src/types';

export type Payload = {
  name: string;
  sub: Types.ObjectId;
  email: string;
  username: string;
  address?: Address;
  phone: string;
};
