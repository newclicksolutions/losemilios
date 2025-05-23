import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
  MessageEvent, Sse,
  Header
} from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { OrderInterface } from '../dto/interfaces/orders/orders.interface';
import { CreateOrderInterface } from '../dto/interfaces/orders/createorders.interface';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { Pagination } from '../dto/interfaces/pagination.dto';
import { SseService } from '../services/sse.service';

@Controller('order')
export class OrderController {
  constructor(private service: OrderService,
    private readonly sseService: SseService
  ) {}

  @Get('Stream/sse')
  @Sse()
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('Content-Type', 'text/event-stream')
  sendOrderStream(): Observable<MessageEvent> {
    return this.sseService.getOrderStream();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getOrder(params.id);
  }

  @Get('user/:id')
  getByuser(@Param() params) {
    return this.service.getOrderbyUser(params.id);
  }
  @Get('email/:id')
  getByemail(@Param() params) {
    return this.service.getOrderbyEmail(params.id);
  }
  @Get('data/byYear')
  getByyearl() {
    return this.service.getOrderByYear();
  }
 

  
  //@UseGuards(AuthGuard('local'))
  @Get()
  getall(@Query() data: Pagination) {
    return this.service.getOrders(data);
  } 
  @Get('/By/Deliver/:userId')
  getallBydeliver(@Query() data: Pagination,@Param() params) {
    return this.service.getOrdersByDeliver(data,params.userId);
  } 

   @Get('/getLastOrder/last')
  getLastOrder() {
    return this.service.findLastOrder();
  } 

  @Post('/orderdelivery')
  async  getBydate(@Body() data: any) {
     return await this.service.getOrdersdeliveryBydateall(data);
  }


  @Post('/start/soket/io')
  async  starsoket(@Body() data: any) {
     return await this.service.sokettest();
  }


  @Post('/allorderdelivery')
  async  getallBydate(@Body() data: any) {
     return await this.service.getOrdersdeliveryBydate(data);
  }
  @Post('/buyorder')
  async  getallbuyorderBydate(@Body() data: any) { 
     return await this.service.getBybuyorder(data);
  }
  @Post('/print')
  async imprimir() {

  }


  @Post('/encabezado')
  async encabezado(@Body() data: any) {
    const encabezado = await this.service.getByheader(data);
    const detalle = await this.service.getByheadervariant(data);
    console.log(encabezado.Cliente);
return{
  encabezado: encabezado,
  detalle:detalle
} 
  }

  @Post('/updatastatus')
  async  updatastatus(@Body() data: any) {
     return await this.service.updateState(data.id,data.state);
  }
  @Post()
  async create(@Body() data: CreateOrderInterface) {
    const maxid = await this.service.getMaxId();
    data.order_id = maxid + 1;
    if (data.tax_amount ==null || data.total_sale ==null) {
      let total = 0
      let totaltax = 0
      for (const key in data.orderproduct) {
        const element = data.orderproduct[key];
        total = total + (element.quantity * element.price)
        totaltax = totaltax + element.tax_value
      }
      data.tax_amount = total
      data.total_sale = totaltax
    }
    return this.service.createOrder(data);
  } 

  @Put()
  update(@Body() data: CreateOrderInterface) {
    return this.service.updateOrder(data);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteOrder(params.id);
  }



  
}


