import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../dto/db/category.entity';
import { CategoryInterface } from '../dto/interfaces/product/category.Interface';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getone(user: CategoryInterface): Promise<CategoryInterface[]> {
    return await this.categoryRepository.find();
  }

  async getConfig(_id: number){
    return await this.categoryRepository.findOne({
        where: [{ config_id: _id }],
      }
    );
  }

  async create(data: CategoryInterface) {
    const usertype = await this.categoryRepository.create(data);
    return this.categoryRepository.save(usertype);
  }
  async findAll() {
    return await this.categoryRepository.find();
  }
  async update(data: CategoryInterface) {
    return this.categoryRepository.save(data);
  }

  async delete(data: CategoryInterface) {
    return this.categoryRepository.delete(data);
  }
}
