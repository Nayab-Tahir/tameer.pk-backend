import { Types } from 'mongoose';

export interface CreateDetailsTracKer {
  completionPercentage: number;
  cost: number;
  numberOfDays: number;
  description: string;
  profit: number;
  revenue: number;
  projectId: Types.ObjectId;
}
