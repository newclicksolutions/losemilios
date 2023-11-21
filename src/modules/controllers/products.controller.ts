import { Controller, Get, Post, Put, Param, Delete, Body } from '@nestjs/common';
import { ProductsService } from '../services/product.service';
import {CreateProdutcDto} from '../dto/interfaces/products/createproduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') data: CreateProdutcDto) {
    return this.productService.getProduct(data);
  }

  @Get()
  getAllProducts(data: CreateProdutcDto) {
    return this.productService.getAllProducts(data);
  }

  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.(data);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: CreateProdutcDto) {
    return this.productService.updateProduct(data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') data: CreateProdutcDto) {
    return this.productService.deleteProduct(data);
  }
}
