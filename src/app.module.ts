import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_CONNECTION_STRING } from './constants';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_CONNECTION_STRING), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
