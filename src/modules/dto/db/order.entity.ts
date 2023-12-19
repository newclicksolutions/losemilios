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
  OneToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { OederProdutsEntity } from './orderproducts.entity';
import { PaymethodEntity } from './paymethod.entity';
import { OrderStatusEntity } from './orderstatus.entity'; 
import { UserEntity } from './user.entity';
import { RestaurantEntity } from './restaurant.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('orders')
export class OrderEntity extends   BaseEntity{
  @PrimaryColumn()
  order_id: number;

  @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP', onUpdate: ''}) 
  date_created: Date;

  @BeforeInsert()
  updatedatecreated() {
    this.date_created = new Date();
  }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;


  @BeforeInsert()
  updateorderdate() {
    this.order_date = new Date();
  }

  @Column()
  tax_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  shipped_date: Date;

  @BeforeInsert()
  updateshippeddate() {
    this.shipped_date = new Date();
  }

  @Column()
  shipping_amount: number;

  @Column()
  tiping_amount: number;

  @Column()
  subtotal: number;

  @Column()
  total_sale: number;

  @Column({ length: 950 })
  shipping: String;

  @Column({ length: 950 })
  ship: String;

  @Column({ length: 90 })
  reference_code: String;

  @Column({ length: 90 })
  customername: String;

  @Column({ length: 90 })
  customertel: String;

  @Column({ length: 90 })
  customeremail: String;

  @ManyToOne(
    type => OrderStatusEntity,
    orderstatus => orderstatus.Order,
  )
  OrderStatus: OrderStatusEntity;

  @ManyToMany(
    type => PaymethodEntity,
    product => product.Orders,
  )
  @JoinTable()
  Paymethod: PaymethodEntity[];

  @OneToMany(
    type => OederProdutsEntity,
    orderproduct => orderproduct.order,
  )
  public orderproduct!: OederProdutsEntity[];

  @ManyToMany(
    type => UserEntity,
    user => user.Order,
  )
  @JoinTable()
  User: UserEntity[];

  @ManyToOne(
    type => RestaurantEntity,
    restaurant => restaurant.Restaurant,
  )
  Restaurant: RestaurantEntity;

  @OneToOne(
    type => TransactionEntity,
    transaction => transaction.order,
  )
  Transaction: TransactionEntity;
}
