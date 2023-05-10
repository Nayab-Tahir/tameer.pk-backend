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
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED';
