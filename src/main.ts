import { NestFactory } from '@nestjs/core'
import { join } from 'path';
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transform } from 'stream';
import { TransformOperationExecutor } from 'class-transformer/TransformOperationExecutor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  // /api/endpointName
  app.useStaticAssets(join(__dirname, '..', 'upload/products'));
  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion:true
    }
  }
    
  ));
  //enable CORS:
  app.enableCors();
  //set to use a dynamic port:
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
