import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../services/order.service';
import { OrderController } from '../controllers/order.controller'; 
import { OrderEntity } from '../dto/db/order.entity';
import { MailModule } from './mail.module';
import { optionsModule } from './options.module';
import { OrderProductModule } from './orderproduct.module';
import { OrderGateway } from '../../config/order.gateway';
import { SseService } from '../services/sse.service';

@Module({
  imports: [optionsModule,MailModule,OrderProductModule, TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService,OrderGateway,SseService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
