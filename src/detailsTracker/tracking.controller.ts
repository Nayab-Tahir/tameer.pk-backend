import { TrackerService } from './tracking.service';
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
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CreateDetailsTracKer } from './dto/create-details-tracker.dto';
import { TrackerDocument } from './schema/details-tracker.schema';
import { Types } from 'mongoose';

@Controller('details-tracker')
export class TrackerController {
  constructor(private trackerService: TrackerService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() trackerData: CreateDetailsTracKer,
  ): Promise<TrackerDocument> {
    return this.trackerService.create(trackerData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(): Promise<TrackerDocument[]> {
    return this.trackerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOneById(
    @Param('id') id: Types.ObjectId,
  ): Promise<TrackerDocument> | undefined {
    return this.trackerService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all/:projectId')
  async findAllByUserId(
    @Param('projectId') projectId: Types.ObjectId,
  ): Promise<TrackerDocument[]> {
    return this.trackerService.findAllByProjectId(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Body() userData: Partial<CreateDetailsTracKer>,
    @Param('id') id: Types.ObjectId,
  ): Promise<TrackerDocument> | undefined {
    return this.trackerService.update(userData, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.trackerService.delete(id);
  }
}
