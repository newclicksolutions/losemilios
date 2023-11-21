import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/module/product.module';
import { ProductsController } from './modules/controllers/products.controller';
import {ProductsService} from './modules/services/product.service';
import { from } from 'rxjs';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ConfigModule,
    AuthModule,
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController,ProductsController],
  providers: [AppService],
})
//export
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}

