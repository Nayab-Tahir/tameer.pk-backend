import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectStatus } from '../dto/create-project.dto';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  /**
   * Name of the ongoing project
   */
  @Prop({ required: true })
  name: string;

  /**
   * Description about the ongoing project
   */
  @Prop({ required: true })
  description: string;

  /**
   * Date when the project started
   */
  @Prop({ required: true })
  startDate: string;

  /**
   * Area of the project in sq ft.
   */
  @Prop({ required: true })
  area: string;

  /**
   * estimated days to complete
   */
  @Prop({ required: true })
  estimatedDays: number;

  /**
   * estimated cost to complete
   */
  @Prop({ required: true })
  estimatedCost: number;

  /**
   * working status of the project ACTIVE or COMPLETED
   */
  @Prop({ required: true })
  status: ProjectStatus;

  /**
   * how much the project is completed
   */
  @Prop({ required: true })
  completionPercentage: number;

  /**
   * Total revenue contractor earned
   */
  @Prop({ required: true })
  revenue: number;

  /**
   * Total profit contractor get
   */
  @Prop({ required: true })
  profit: number;

  /**
   * User who created the project
   */
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
