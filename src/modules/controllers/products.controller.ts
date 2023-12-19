import { Controller, Get, Post, Put, Param, Delete, Body, UseInterceptors,UploadedFile, Query,} from '@nestjs/common';
import { ProductsService } from '../services/product.service';
import {CreateProdutcDto} from '../dto/interfaces/products/createproduct.dto';
var _ = require('lodash');
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, exportFileName, editFileName } from '../../config/file-upload.utils';
import { diskStorage } from 'multer';
import { Pagination } from '../dto/interfaces/pagination.dto';
'use strict';
const excelToJson = require('convert-excel-to-json');

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') data: number) {
    return this.productService.getProduct(data);
  }

  @Get()
  getAllProducts(@Query()data: Pagination) {
    return this.productService.getAllProducts(data);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/products',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async import(@UploadedFile() file) {
  return file;
  }

  @Post()
  createProduct(@Body() data: CreateProdutcDto) {
    return this.productService.createProducts(data);
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
