import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
  Double,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { additionsyEntity } from './additions.entity';

@Entity('galery')
export class GaleryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  galery_id: number;

  @Column({ length: 100 })
  img_name: string;

  @Column({ length: 950 })
  img_url: string;

  @ManyToOne(
    type => ProductEntity,
    galeryid => galeryid.Skuid,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  sku_produt_id: ProductEntity;

  @ManyToOne(
    type => additionsyEntity,
    galeryid => galeryid.addition,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  addition: additionsyEntity;
}
