import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import { TransactionService } from '../services/transaction.service';
  import { TransactionInterface } from '../dto/interfaces/transaction/transaction.interface'

  @Controller('transaction') 
  export class TransactionController {
    constructor(private service: TransactionService) {}
    @Post()
    create(@Body() data:TransactionInterface) {
        return this.service.create(data);
    }

    @Get()
    getTransaction() {
        return this.service.findAll();
    }
  }
