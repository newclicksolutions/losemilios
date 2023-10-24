import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutcDto } from '../dto/interfaces/products/createproduct.dto';
import { ProductEntity } from '../dto/db/product.entity';
import { Product } from 'aws-sdk/clients/ssm';
import { UpdateProductInput } from 'aws-sdk/clients/servicecatalog';
import { UpdateProfileRequestDurationSecondsInteger } from 'aws-sdk/clients/rolesanywhere';

@Injectable()
export class ProductsService {
    constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,

  ) {}
  
  async getProduct(product: CreateProdutcDto): Promise<CreateProdutcDto[]> {
    const products = await this.productsRepository.find({
      relations: ['Category','addition', 'Skuid']
    });
  
    return;
  }
  

  async getAllProducts(product: CreateProdutcDto): Promise<CreateProdutcDto[]> {
    const products = await this.productsRepository.find({
      relations: ['Category','addition', 'Skuid']
    });
  
    return products;
  }

  async updateProduct(product: CreateProdutcDto): Promise<CreateProdutcDto[]> {
    const products = await this.productsRepository.find({
      relations: ['Category','addition', 'Skuid']
    });
  
    return;
  }

  async deleteProduct(product: CreateProdutcDto): Promise<CreateProdutcDto[]> {
    const products = await this.productsRepository.find({
    });
  
    return;
  }

}

