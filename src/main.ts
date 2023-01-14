import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('APPLICATION STARTED');
  await app.listen(APPLICATION_PORT);
}
bootstrap();
