import { Address } from './../../types/general';
import { Types } from 'mongoose';

export type Payload = {
  name: string;
  sub: Types.ObjectId;
  email: string;
  username: string;
  address?: Address;
};
