import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
  Double,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_status')
export class OrderStatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column({ length: 30 })
  status: String;

  @Column('timestamp')
  created_ad: Timestamp;

  @Column()
  update_ad: Date;

  @OneToMany(
    type => OrderEntity,
    order => order.OrderStatus,
  )
  Order: OrderEntity[];
}
