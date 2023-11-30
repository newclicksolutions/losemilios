import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { UserTypePermissionEntity } from './permissionusertype.entity';

@Entity('permission')
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({ length: 50 })
  permission_name: string;

  @OneToMany(
    type => UserTypePermissionEntity,
    permission => permission.permission_id,
  )
  Permission: UserTypePermissionEntity[];
}
