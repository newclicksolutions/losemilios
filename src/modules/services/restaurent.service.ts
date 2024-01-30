import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { RestaurantEntity } from '../dto/db/restaurant.entity';
import { RestaurentInterface } from '../dto/interfaces/restaurant/restaurant.interface';
import { UsersService } from '../services/user.service';

@Injectable()
export class RestauratService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private RestaurantRepository: Repository<RestaurantEntity>,
    private userservice: UsersService,
  ) {}

  async getrestaurants(): Promise<RestaurentInterface[]> {
    return await this.RestaurantRepository.find({
      relations: ['user','user.user_type_id'],
      where: [{deletedAt: IsNull() }],
    });
  }

  /*
  async getTopUser(data: RestaurentInterface) {
    return await this.RestaurantRepository.find({
      relations: ['client_type_id', 'user_type_id'],
      take: data.limit,
    });
  }*/

  async getRestaurant(_id: number): Promise<RestaurentInterface[]> {
    return await this.RestaurantRepository.find({
      relations: ['user','user.user_type_id'],
      where: [{ restaurant_id: _id , deletedAt: IsNull() }],
    });
  }
  /*
  async findOne(name: string): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id'],
      where: [{ user_neme: name }],
    });
  }*/

  async findOne(username: string): Promise<RestaurentInterface[]> {
    return await this.RestaurantRepository.find({
      relations: ['user', 'City', 'children'],
      where: [{ restaurant_neme: name }],
    });
  }

  async create(data: RestaurentInterface) {
    const restaurant = await this.RestaurantRepository.create(data);
    try {
      const result = await this.RestaurantRepository.save(restaurant);
      if (result) {
        return result
      }
    } catch (error) {
      return error
    }
  }

  async findAll() {
    return await this.RestaurantRepository.createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.children', 'child')
      .leftJoinAndSelect('child.City', 'Ccity')
      .leftJoinAndSelect('child.user', 'Cuser')
      .leftJoinAndSelect('child.Discounts', 'cdiscount')
      .leftJoinAndSelect('restaurant.City', 'citys')
      .leftJoinAndSelect('restaurant.user', 'users')
      .leftJoinAndSelect('restaurant.Discounts', 'discount')
      .getMany();
  }

  async findAllparent() {
    return await this.RestaurantRepository.createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.children', 'child')
      .leftJoinAndSelect('child.City', 'Ccity')
      .leftJoinAndSelect('child.user', 'Cuser')
      .leftJoinAndSelect('child.Discounts', 'cdiscount')
      .leftJoinAndSelect('restaurant.City', 'citys')
      .leftJoinAndSelect('restaurant.user', 'users')
      .leftJoinAndSelect('restaurant.Discounts', 'discount')
      .where('restaurant.parentRestaurantId is null')
      .getMany();
  }

  async findAllchlid() {
    return await this.RestaurantRepository.createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.parent', 'paren')
      .leftJoinAndSelect('paren.City', 'Pparen')
      .leftJoinAndSelect('paren.user', 'Puser')
      .leftJoinAndSelect('paren.Discounts', 'pdiscount')
      .leftJoinAndSelect('Puser.user_type_id', 'Ptuser')
      .leftJoinAndSelect('restaurant.City', 'citys')
      .leftJoinAndSelect('restaurant.user', 'users')
      .leftJoinAndSelect('users.user_type_id', 'Tusers')
      .leftJoinAndSelect('restaurant.Discounts', 'discount')
      .where('restaurant.parentRestaurantId is not null')
      .getMany();
  }
  async update(data: RestaurentInterface) {
    try {
      const restaurant = await this.RestaurantRepository.create(data);
      const result = await this.RestaurantRepository.save(restaurant);
      if (result) {
        return result
      }
    } catch (error) {
      return error
    }
  }

  async delete(user: RestaurentInterface) {
    try {
      const result = await this.RestaurantRepository.delete(user);
      if (result) {
        return result
      }
    } catch (error) {
      return error
    }
  }

  async deleteatRestaurant(data: RestaurentInterface) {
    let ID = data.restaurant_id
    const valrestaurant = await this.RestaurantRepository.createQueryBuilder('restaurant')
    .where('restaurant.parentRestaurantId is null AND restaurant.restaurant_id=:ID',{ID})
    .getOne();
    if (valrestaurant) {
      const deleteat = await this.RestaurantRepository.createQueryBuilder()
      .update('restaurant')
      .set({deletedAt: data.deletedAt})
      .where("parentRestaurantId = :id OR restaurant_id = :id", {id: data.restaurant_id})
      .execute();
      return deleteat;
    }else{
      const deleteat = await this.RestaurantRepository.createQueryBuilder()
      .update('restaurant')
      .set({deletedAt: data.deletedAt})
      .where("restaurant_id = :id", {id: data.restaurant_id})
      .execute();
      return deleteat;
    }
  }

}
