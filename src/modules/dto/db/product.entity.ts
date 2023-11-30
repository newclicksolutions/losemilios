import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp, 
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { GaleryEntity } from './galery.entity';
import { additionsyEntity } from './additions.entity';
import { OederProdutsEntity } from './orderproducts.entity';
//import { AditionrPoductsEntityEntity } from './aditionproducts.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 50 })
  title: string;

  @Column()
  tax: number;

  @Column('float')
  price: number;

  @Column({ length: 950 })
  content: String;

  @Column({ length: 250 })
  unit: string;

  @Column({ nullable: true })
  deletedAt: Date;
  
  @Column({ length: 350 })
  img: string;

  @Column({ default: 0 }) 
  value: number;

  @ManyToOne(
    type => CategoryEntity,
    category => category.categorys,
  )
  Category: CategoryEntity;
  
  @OneToMany(
    type => GaleryEntity,
    skuid => skuid.sku_produt_id,
  )
  Skuid: GaleryEntity[];

  @ManyToMany(
    type => ProductEntity,
    Addition => Addition.product,
  )

  @JoinTable()
  addition: ProductEntity[];

  @ManyToMany(
    type => ProductEntity,
    Product => Product.addition,
  )
  product: ProductEntity[];

  @OneToMany(
    type => OederProdutsEntity,
    orderproduct => orderproduct.product,
  )
  public orderproduct!: OederProdutsEntity[];

}

