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
import { CategoryEntity } from './category.entity';
import { GaleryEntity } from './galery.entity';
import { additionsyEntity } from './additions.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  tax: number;

  @Column('float')
  price: number;

  @Column({ length: 950 })
  description: String;

  @Column({ length: 250 })
  unit: string;

  @Column({ nullable: true })
  deletedAt: Date;
  
  @ManyToOne(
    type => CategoryEntity,
    category => category.categorys,
  )
  Category: CategoryEntity;

  @ManyToOne(
    type => additionsyEntity,
    category => category.additions,
  )
  addition: additionsyEntity;

  
  @OneToMany(
    type => GaleryEntity,
    skuid => skuid.sku_produt_id,
  )
  Skuid: GaleryEntity[];


}
