import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enable('trust proxy');

  // app.useGlobalPipes(
  //     new ValidationPipe({
  //         disableErrorMessages: true,
  //
  //         whitelist: true,
  //         forbidNonWhitelisted: true,
  //
  //         transform: true,
  //         transformOptions: {
  //             enableImplicitConversion: true,
  //         },
  //     }),
  // );

  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
