import { JwtAuthGuard } from './../auth/guards/jwt.auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDocument } from './schema/project.schema';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() projectData: CreateProjectDto,
  ): Promise<ProjectDocument> {
    return this.projectService.create(projectData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(): Promise<ProjectDocument[]> {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOneById(
    @Param('id') id: Types.ObjectId,
  ): Promise<ProjectDocument> | undefined {
    return this.projectService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all/:userId')
  async findAllByUserId(
    @Param('userId') userId: Types.ObjectId,
  ): Promise<ProjectDocument[]> {
    return this.projectService.findAllByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Body() userData: Partial<CreateProjectDto>,
    @Param('id') id: Types.ObjectId,
  ): Promise<ProjectDocument> | undefined {
    return this.projectService.update(userData, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.projectService.delete(id);
  }
}
