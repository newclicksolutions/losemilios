import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number

  @Column({ length: 50 })
  category: string;

  @OneToMany(
    type => ProductEntity,
    categ => categ.Category,
  )
  categorys: ProductEntity[];
}
