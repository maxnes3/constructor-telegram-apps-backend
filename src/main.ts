import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.NESTJS_FRONT_URL],
    credentials: true,
    exposedHeaders: 'set-cookie'
  });

  const config = new DocumentBuilder()
    .setTitle('NovaToolkit')
    .setDescription(
      'The backend of "NovaToolkit" diplom work by Maxim Bondarenko'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NESTJS_SERVER_PORT);
}
bootstrap();
