import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/project.schema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TrackerModule } from 'src/detailsTracker/tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ProjectSchema, name: Project.name }]),
    TrackerModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
