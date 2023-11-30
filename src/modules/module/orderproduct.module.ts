import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductService } from '../services/orderproduct.service';
import { OrderproductController } from '../controllers/orderproduct.controller';
import { OederProdutsEntity } from '../dto/db/orderproducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OederProdutsEntity])],
  providers: [OrderProductService],
  controllers: [OrderproductController],
  exports: [OrderProductService],
})
export class OrderProductModule {}
