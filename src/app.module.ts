import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/module/user.module';
import { ProductModule } from './modules/module/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { optionsModule } from './modules/module/options.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { AuthModule } from './modules/auth/auth.module';
import { PayuModule } from './modules/module/payu.module';
import { TransactionModule } from './modules/module/transaction.module';
import { OrderModule } from './modules/module/order.module';
import { OrderProductModule } from './modules/module/orderproduct.module';
import { RestaurantModule } from './modules/module/restaurant.module';
import { OrderStatusModule } from './modules/module/orderstatus.module';
import { TypeProductModule } from './modules/module/typeproduct.module';
import { MailModule } from './modules/module/mail.module';
import { from } from 'rxjs';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    RestaurantModule,
    MailModule,
    ConfigModule,
    optionsModule,
    AuthModule,
    PayuModule,
    TransactionModule,
    OrderModule,
    OrderProductModule,
    ProductModule,
    TypeProductModule,
    OrderStatusModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload/products'),
      serveStaticOptions: { index: false },
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
//export
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
