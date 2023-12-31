import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_CONNECTION_STRING } from './constants';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TrackerModule } from './detailsTracker/tracking.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_CONNECTION_STRING),
    UserModule,
    AuthModule,
    ProjectModule,
    TrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
