import { Tracker, TrackerDocument } from './schema/details-tracker.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDetailsTracKer } from './dto/create-details-tracker.dto';

@Injectable()
export class TrackerService {
  constructor(
    @InjectModel(Tracker.name) private TrackerModel: Model<TrackerDocument>,
  ) {}
  async create(trackerData: CreateDetailsTracKer): Promise<TrackerDocument> {
    const newTracker = new this.TrackerModel(trackerData);
    return newTracker.save();
  }

  async findAll(): Promise<TrackerDocument[]> {
    return this.TrackerModel.find().exec();
  }

  async findAllByProjectId(
    projectId: Types.ObjectId,
  ): Promise<TrackerDocument[]> {
    return this.TrackerModel.find({ projectId }).exec();
  }

  async findOneById(id: Types.ObjectId): Promise<TrackerDocument> {
    return this.TrackerModel.findOne({ _id: id }).exec();
  }

  async delete(id: Types.ObjectId) {
    return this.TrackerModel.deleteOne({ _id: id }).exec();
  }

  async update(
    project: Partial<CreateDetailsTracKer>,
    id: Types.ObjectId,
  ): Promise<TrackerDocument> {
    return this.TrackerModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...project,
      },
      {
        new: true,
      },
    );
  }
}
