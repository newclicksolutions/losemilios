import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OederProdutsEntity } from '../dto/db/orderproducts.entity';
import { OrderProductInterface } from '../dto/interfaces/orders/ordersproduct.interface';
//import { OrderProductInterface } from '../dto/interfaces/orders/cr';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OederProdutsEntity)
    private OrderRepository: Repository<OederProdutsEntity>,
  ) {}

  async getOrders(
    order: OrderProductInterface,
  ): Promise<OrderProductInterface[]> {
    return await this.OrderRepository.find({
      relations: ['product', 'order'],
    });
  }

  async getOrder(_id: number): Promise<OrderProductInterface[]> {
    return await this.OrderRepository.find({ relations: ['product', 'order'] });
  }
  async CreateOrderProdut(data: OrderProductInterface) {
    const order = await this.OrderRepository.create(data);
    return this.OrderRepository.save(order);
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
  async updateOrder(data: OrderProductInterface) {
    const user = await this.OrderRepository.create(data);
    return await this.OrderRepository.save(user);
  }

  async deleteOrder(data: OrderProductInterface) {
    return this.OrderRepository.delete(data);
  }
}
