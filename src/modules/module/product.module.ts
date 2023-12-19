import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../services/product.service';
import { ProductsController } from '../controllers/products.controller';
import { ProductEntity } from '../dto/db/product.entity';
import { MailModule } from './mail.module';
import { optionsModule } from './options.module';
import { TypeProductModule } from './typeproduct.module';

@Module({
  imports: [TypeProductModule,optionsModule,MailModule,TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports:[ProductsService],
})
export class ProductModule {}