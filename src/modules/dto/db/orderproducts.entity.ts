import { float } from 'aws-sdk/clients/lightsail';
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
import { ProductEntity } from './product.entity';

@Entity('order_products')
export class OederProdutsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public order_products_id!: number;

  @Column({ length: 60 })
  public sku!: string;

  @Column() 
  public quantity!: number;

  @Column('float')
  public price: number;

  @Column()
  public total!: number;

  @Column()
  public totaladitions!: number;

  @Column({ length: 30 })
  public unit!: string;

  @Column({ length: 90 })
  public name!: string;

  @Column({ length: 90 })
  public nota!: string;

  @Column({ length: 950 })
  public aditions!: string;

  @ManyToOne(
    type => OrderEntity,
    order => order.orderproduct,
  )
  public order!: OrderEntity;

  @ManyToOne(
    type => ProductEntity,
    product => product.orderproduct,
  )
  public product!: ProductEntity;
}
