import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackerController } from './tracking.controller';
import { TrackerService } from './tracking.service';
import { Tracker, TrackerSchema } from './schema/details-tracker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: TrackerSchema, name: Tracker.name }]),
  ],
  controllers: [TrackerController],
  providers: [TrackerService],
  exports: [TrackerService],
})
export class TrackerModule {}
