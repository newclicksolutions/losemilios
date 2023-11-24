/* import { float } from 'aws-sdk/clients/lightsail';
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
import { ProductEntity } from './product.entity';

@Entity('adition_products')
export class AditionrPoductsEntityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public adition_products_id!: number;


  @ManyToOne(
    type => OrderEntity,
    order => order.orderproduct,
  )
  public order!: ProductEntity;

  @ManyToOne(
    type => ProductEntity,
    product => product.orderproduct,
  )
  public product!: ProductEntity;
}
 */