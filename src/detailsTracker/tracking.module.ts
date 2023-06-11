import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackerController } from './tracking.controller';
import { TrackerService } from './tracking.service';
import { Tracker, TrackerSchema } from './schema/details-tracker.schema';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: TrackerSchema, name: Tracker.name }]),
    forwardRef(() => ProjectModule),
  ],
  controllers: [TrackerController],
  providers: [TrackerService],
  exports: [TrackerService],
})
export class TrackerModule {}
