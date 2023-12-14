import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusEntity } from '../dto/db/orderstatus.entity';
import { OrderStatusInterface } from '../dto/interfaces/orders/orderstatus.interface';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private OrderRepository: Repository<OrderStatusEntity>,
  ) {}

  async getOrders(
    order: OrderStatusInterface,
  ): Promise<OrderStatusInterface[]> {
    return await this.OrderRepository.find();
  }

  async getOrdersstatus() {
    return await this.OrderRepository.find();
  }

  async getOrder(_id: number): Promise<OrderStatusInterface[]> {
    return await this.OrderRepository.find();
  }
  async createOrder(data: OrderStatusInterface) {
    const user = await this.OrderRepository.create(data);
    return this.OrderRepository.save(user);
  }
  /*
  async findAllQuery() {
    return await this.OrderRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.client_type_id', 'Client')
      .leftJoinAndSelect('users.restaurant', 'restaurants')
      .leftJoinAndSelect('users.user_type_id', 'type')
      .getMany();
  }
  */
  async updateOrder(data: OrderStatusInterface) {
    const user = await this.OrderRepository.create(data);
    return this.OrderRepository.save(user);
  }

  async deleteOrder(data: OrderStatusInterface) {
    return this.OrderRepository.delete(data);
  }
}
