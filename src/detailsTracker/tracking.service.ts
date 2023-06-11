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

  async delete(projectId: Types.ObjectId, id: Types.ObjectId) {
    const previousTracker = await this.findOneById(id);
    const containingProject = await this.projectService.findOneById(projectId);
    await this.projectService.update(
      {
        completionPercentage:
          containingProject.completionPercentage -
          previousTracker.completionPercentage,
        spentCost: containingProject.spentCost - previousTracker.cost,
        spentNumberOfDays:
          containingProject.spentNumberOfDays - previousTracker.numberOfDays,
        profit: containingProject.profit - previousTracker.profit,
        revenue: containingProject.revenue - previousTracker.revenue,
      },
      projectId,
    );
    return this.TrackerModel.deleteOne({ _id: id }).exec();
  }

  async deleteManyByProjectId(id: Types.ObjectId) {
    return this.TrackerModel.deleteMany({ projectId: id }).exec();
  }

  async update(
    detailTracker: Partial<CreateDetailsTracKer>,
    id: Types.ObjectId,
  ): Promise<TrackerDocument> {
    const previousTracker = await this.findOneById(id);
    const containingProject = await this.projectService.findOneById(
      detailTracker.projectId,
    );

    await this.projectService.update(
      {
        completionPercentage:
          containingProject.completionPercentage -
          previousTracker.completionPercentage +
          detailTracker.completionPercentage,
        spentCost:
          containingProject.spentCost -
          previousTracker.cost +
          detailTracker.cost,
        spentNumberOfDays:
          containingProject.spentNumberOfDays -
          previousTracker.numberOfDays +
          detailTracker.numberOfDays,
        profit:
          containingProject.profit -
          previousTracker.profit +
          detailTracker.profit,
        revenue:
          containingProject.revenue -
          previousTracker.revenue +
          detailTracker.revenue,
      },
      detailTracker.projectId,
    );
    delete detailTracker.projectId;
    return this.TrackerModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...detailTracker,
      },
      {
        new: true,
      },
    );
  }
}
