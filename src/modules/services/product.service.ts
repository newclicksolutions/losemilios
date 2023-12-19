import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutcDto } from '../dto/interfaces/products/createproduct.dto';
import { ProductEntity } from '../dto/db/product.entity';
import { Product } from 'aws-sdk/clients/ssm';
import { UpdateProductInput } from 'aws-sdk/clients/servicecatalog';
import { UpdateProfileRequestDurationSecondsInteger } from 'aws-sdk/clients/rolesanywhere';
import { Pagination } from '../dto/interfaces/pagination.dto';
import { match } from 'assert';

@Injectable()
export class ProductsService {
    constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,

  ) {}
  
  async getProduct(product: number): Promise<CreateProdutcDto[]> {
    return await this.productsRepository.find({
      relations: ['Category','addition'],
      where: [{ product_id: product }],
    });
  }
  async getAllProducts(data: Pagination) {
    const total= await this.productsRepository.count();
    const products = await this.productsRepository.find({
      relations: ['Category','addition'],
      skip: data.skip,
      take: data.take,
      order: {
        date_created: 'DESC',
      }  
    });
    return {totalregistros: total,totalpages: Math.round(total/data.take) , data:products};
  }

  async createProducts(product: CreateProdutcDto) {
    const products = await this.productsRepository.save(product)

    const result = await this.productsRepository.create(products)
    return result;
  }


  async updateProduct(product: CreateProdutcDto): Promise<CreateProdutcDto[]> {
    const products = await this.productsRepository.find({
      relations: ['Category','addition', 'Skuid']
    });
  
    return;
  }

  async deleteProduct(product: CreateProdutcDto) {
     return await this.productsRepository.delete(product);

  }

}

