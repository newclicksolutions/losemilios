import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TypeProductService } from '../services/typeproduct.service';
import { CategoryInterface } from '../dto/interfaces/product/category.Interface';

@Controller('category')
export class TypeProdutController {
  constructor(private service: TypeProductService) {}

  @Get()
  getall(): any {
    return this.service.findAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this.service.getone(params.id);
  }

  @Post()
  create(@Body() data: CategoryInterface) {
    return this.service.create(data);
    console.log(data);
  }

  @Put()
  update(@Body() data: CategoryInterface) {
    return this.service.update(data);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.service.delete(params.id);
  }
}
