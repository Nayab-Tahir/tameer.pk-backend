import { Types } from 'mongoose';

export interface CreateProjectDto {
  area: string;
  completionPercentage: number;
  description: string;
  estimatedCost: number;
  estimatedDays: number;
  name: string;
  profit: number;
  revenue: number;
  startDate: string;
  status: ProjectStatus;
  userId: Types.ObjectId;
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED';
