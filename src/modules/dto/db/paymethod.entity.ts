import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('paymethod')
export class PaymethodEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  paymethod_id: number;

  @Column({ length: 90 })
  payment_name: string;

  @Column({ length: 90 })
  state: string;

  @ManyToMany(
    type => OrderEntity,
    order => order.Paymethod,
  )
  Orders: OrderEntity[];
}
