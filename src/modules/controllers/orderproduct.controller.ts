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
import { OrderProductService } from '../services/orderproduct.service';
import { OrderProductInterface } from '../dto/interfaces/orders/ordersproduct.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('orderproduct')
export class OrderproductController {
  constructor(private service: OrderProductService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getOrder(params.id);
  }

  //@UseGuards(AuthGuard('local'))
  @Get()
  getall(@Body() data: OrderProductInterface) {
    return this.service.getOrders(data);
  }
  @Post()
  create(@Body() data: OrderProductInterface) {
    return this.service.CreateOrderProdut(data);
  }

  @Put()
  update(@Body() data: OrderProductInterface) {
    return this.service.updateOrder(data);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteOrder(params.id);
  }
}
