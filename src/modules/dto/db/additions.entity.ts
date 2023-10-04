import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { GaleryEntity } from './galery.entity';

@Entity('additions')
export class additionsyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  additions_id: number

  @Column({ length: 50 })
  addition: string;

  @Column({ length: 950 })
  description: String; 

  @Column('float')
  price: number;

  @Column()
  quantity: number;

  @OneToMany(
    type => ProductEntity,
    categ => categ.addition,
  )
  additions: ProductEntity[];

  @OneToMany(
    type => GaleryEntity,
    addid => addid.sku_produt_id,
  )
  addid: GaleryEntity[];
}
