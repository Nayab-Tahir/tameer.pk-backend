import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrackerDocument = HydratedDocument<Tracker>;

@Schema({ timestamps: true })
export class Tracker {
  /**
   * to keep track of details according to specific projects
   */
  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projectId: Types.ObjectId;

  /**
   * how much the project is completed in this particular tracker
   */
  @Prop({ required: true })
  completionPercentage: number;

  /**
   * how much revenue we get in this particular tracker
   */
  @Prop({ required: true })
  revenue: number;

  /**
   * how much profit we get in this particular tracker
   */
  @Prop({ required: true })
  profit: number;

  /**
   * how much cost is spent in this particular tracker
   */
  @Prop({ required: true })
  cost: number;

  /**
   * how much the project is completed in this particular tracker
   */
  @Prop({ required: true })
  numberOfDays: number;

  /**
   * short description about the work done in this particular tracker
   */
  @Prop({ required: true })
  description: string;
}

export const TrackerSchema = SchemaFactory.createForClass(Tracker);
