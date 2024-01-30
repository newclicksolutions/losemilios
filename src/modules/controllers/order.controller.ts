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
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderInterface } from '../dto/interfaces/orders/orders.interface';
import { CreateOrderInterface } from '../dto/interfaces/orders/createorders.interface';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { Pagination } from '../dto/interfaces/pagination.dto';
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');

@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

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

  @Post('/orderdelivery')
  async  getBydate(@Body() data: any) {
     return await this.service.getOrdersdeliveryBydateall(data);
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
    const printer = new ThermalPrinter({
      type: PrinterTypes.EPSON, // 'star' or 'epson'
      interface: '\\.\COM1',
      options: {
        timeout: 1000,
      },
      width: 48, // Number of characters in one line - default: 48
      characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
      breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
      removeSpecialCharacters: false, // Removes special characters - default: false
      lineCharacter: '-', // Use custom character for drawing lines - default: -
    });
  
    const isConnected = await printer.isPrinterConnected();
    console.log('Printer connected:', isConnected);
  
    printer.alignCenter();
  
    printer.alignLeft();
    printer.newLine();
    printer.println('Hello World!');
    printer.println('This is a long line that will be collapsed into two lines');
    printer.drawLine();
  
    printer.upsideDown(true);
    printer.println('Hello World upside down!');
    printer.upsideDown(false);
    printer.drawLine();
  
    printer.invert(true);
    printer.println('Hello World inverted!');
    printer.invert(false);
    printer.drawLine();
  
    printer.println('Special characters: ČčŠšŽžĐđĆćßẞöÖÄäüÜé');
    printer.drawLine();
  
    printer.setTypeFontB();
    printer.println('Type font B');
    printer.setTypeFontA();
    printer.println('Type font A');
    printer.drawLine();
  
    printer.alignLeft();
    printer.println('This text is on the left');
    printer.alignCenter();
    printer.println('This text is in the middle');
    printer.alignRight();
    printer.println('This text is on the right');
    printer.alignLeft();
    printer.drawLine();
  
    printer.setTextDoubleHeight();
    printer.println('This is double height');
    printer.setTextDoubleWidth();
    printer.println('This is double width');
    printer.setTextQuadArea();
    printer.println('This is quad');
    printer.setTextSize(7, 7);
    printer.println('Wow');
    printer.setTextSize(0, 0);
    printer.setTextNormal();
    printer.println('This is normal');
    printer.drawLine();
    
    printer.println('Draw a line with a custom character');
    printer.drawLine('=');
  
    try {
      printer.printBarcode('4126570807191');
      printer.code128('4126570807191', {
        height: 50,
        text: 1,
      });
      printer.beep();
    } catch (error) {
      console.error(error);
    }
  
    printer.pdf417('4126565129008670807191');
    printer.printQR('https://olaii.com');
  
    printer.newLine();
  
    printer.leftRight('Left', 'Right');
  
    printer.table(['One', 'Two', 'Three', 'Four']);
  
    printer.tableCustom([
      { text: 'Left', align: 'LEFT', width: 0.5 },
      {
        text: 'Center', align: 'CENTER', width: 0.25, bold: true,
      },
      { text: 'Right', align: 'RIGHT', width: 0.25 },
    ]);
  
    printer.tableCustom([
      { text: 'Left', align: 'LEFT', cols: 8 },
      {
        text: 'Center', align: 'CENTER', cols: 10, bold: true,
      },
      { text: 'Right', align: 'RIGHT', cols: 10 },
    ]);
  
    printer.cut();
    printer.openCashDrawer();
  
    console.log(printer.getText());
  
    try {
      await printer.execute();
      console.log('Print success.');
    } catch (error) {
      console.error('Print error:', error);
    }
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


