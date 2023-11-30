import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';


@Entity('restaurant')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  restaurant_id: number;

  @Column()
  reference_id: number;

  @Column({ length: 90,nullable: true })
  nit: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 0 })
  address: string;

  @Column()
  priority: number;

  @Column({ nullable: true })
  deletedAt: Date;


  @ManyToOne(
    type => RestaurantEntity,
    restauranrant => restauranrant.children,
  )
  parent: RestaurantEntity;

  @OneToMany(
    type => RestaurantEntity,
    restauranrant => restauranrant.parent,
  )
  children: RestaurantEntity[];


  @ManyToMany(
    type => UserEntity,
    User => User.restaurant,
  )
  @JoinTable()
  user: UserEntity[];

  @OneToMany(
    type => OrderEntity,
    restauranrant => restauranrant.User,
  )
  Restaurant: OrderEntity[];

}
