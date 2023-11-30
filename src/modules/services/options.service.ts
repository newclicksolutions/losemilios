import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigEntity } from '../dto/db/config.entity';
import { ConfigInterface } from '../dto/interfaces/config/config.Interface';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(ConfigEntity)
    private configRepository: Repository<ConfigEntity>,
  ) {}

  async getone(user: ConfigInterface): Promise<ConfigInterface[]> {
    return await this.configRepository.find();
  }

  async getConfig(_id: number){
    return await this.configRepository.findOne({
        where: [{ config_id: _id }],
      }
    );
  }

  async create(data: ConfigInterface) {
    const usertype = await this.configRepository.create(data);
    return this.configRepository.save(usertype);
  }
  async findAll() {
    return await this.configRepository.find();
  }
  async update(data: ConfigInterface) {
    return this.configRepository.save(data);
  }

  async delete(data: ConfigInterface) {
    return this.configRepository.delete(data);
  }
}
