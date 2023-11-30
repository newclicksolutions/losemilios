import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderStatusService } from '../services/orderstatus.service';
import { OrderStatusInterface } from '../dto/interfaces/orders/orderstatus.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('orderstatus')
export class OrderStatusController {
  constructor(private service: OrderStatusService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getOrder(params.id);
  }

  //@UseGuards(AuthGuard('local'))
  @Get()
  getall(@Body() data: OrderStatusInterface) {
    return this.service.getOrders(data);
  }
  @Post()
  create(@Body() data: OrderStatusInterface) {
    return this.service.createOrder(data);
  }

  @Put()
  update(@Body() data: OrderStatusInterface) {
    return this.service.updateOrder(data);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteOrder(params.id);
  }
}
