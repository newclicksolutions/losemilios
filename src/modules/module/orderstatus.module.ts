import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusService } from '../services/orderstatus.service';
import { OrderStatusController } from '../controllers/orderstatus.controller';
import { OrderStatusEntity } from '../dto/db/orderstatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  providers: [OrderStatusService],
  controllers: [OrderStatusController],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
