import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private ProjectModal: Model<ProjectDocument>,
  ) {}

  async create(project: CreateProjectDto): Promise<ProjectDocument> {
    const newProject = new this.ProjectModal(project);
    return newProject.save();
  }

  async findAll(): Promise<ProjectDocument[]> {
    return this.ProjectModal.find().exec();
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<ProjectDocument[]> {
    return this.ProjectModal.find({ userId }).exec();
  }

  async findOneById(id: Types.ObjectId): Promise<ProjectDocument> {
    return this.ProjectModal.findOne({ _id: id }).exec();
  }

  async delete(id: Types.ObjectId) {
    return this.ProjectModal.deleteOne({ _id: id }).exec();
  }

  async update(
    project: Partial<CreateProjectDto>,
    id: Types.ObjectId,
  ): Promise<ProjectDocument> {
    return this.ProjectModal.findOneAndUpdate(
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
