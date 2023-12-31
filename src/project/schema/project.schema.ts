import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectAddress, ProjectStatus } from '../dto/create-project.dto';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
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
  area: number;

  /**
   * estimated number of days to complete
   */
  @Prop({ required: true })
  estimatedNumberOfDays: number;

  /**
   * spent number of days so far
   */
  @Prop({ required: true })
  spentNumberOfDays: number;

  /**
   * estimated cost to complete
   */
  @Prop({ required: true })
  estimatedCost: number;

  /**
   * spent cost so far
   */
  @Prop({ required: true })
  spentCost: number;

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

  /**
   * The address of the project
   */
  @Prop({ type: Object, required: true })
  address: ProjectAddress;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
