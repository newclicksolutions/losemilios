import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // /api/endpointName
  app.useGlobalPipes(new ValidationPipe());
  //enable CORS:
  app.enableCors();
  //set to use a dynamic port:
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
