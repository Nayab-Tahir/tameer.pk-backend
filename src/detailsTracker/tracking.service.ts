import { Tracker, TrackerDocument } from './schema/details-tracker.schema';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDetailsTracKer } from './dto/create-details-tracker.dto';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TrackerService {
  constructor(
    @InjectModel(Tracker.name) private TrackerModel: Model<TrackerDocument>,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}
  async create(trackerData: CreateDetailsTracKer): Promise<TrackerDocument> {
    const containingProject = await this.projectService.findOneById(
      trackerData.projectId,
    );
    await this.projectService.update(
      {
        completionPercentage:
          containingProject.completionPercentage +
          trackerData.completionPercentage,
        spentCost: containingProject.spentCost + trackerData.cost,
        spentNumberOfDays:
          containingProject.spentNumberOfDays + trackerData.numberOfDays,
        profit: containingProject.profit + trackerData.profit,
        revenue: containingProject.revenue + trackerData.revenue,
      },
      trackerData.projectId,
    );
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

  async deleteManyByProjectId(id: Types.ObjectId) {
    return this.TrackerModel.deleteMany({ projectId: id }).exec();
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
