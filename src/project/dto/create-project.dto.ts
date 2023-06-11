import { Types } from 'mongoose';

export interface CreateProjectDto {
  area: number;
  completionPercentage: number;
  description: string;
  estimatedCost: number;
  spentCost: number;
  estimatedNumberOfDays: number;
  spentNumberOfDays: number;
  name: string;
  profit: number;
  revenue: number;
  startDate: string;
  status: ProjectStatus;
  userId: Types.ObjectId;
  address: ProjectAddress;
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED';

export interface ProjectAddress {
  streetAddress: string;
  country: string;
  zipCode: number;
}
