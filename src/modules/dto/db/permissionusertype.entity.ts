import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UserTypeEntity } from './usertype.entity';

@Entity('user_type_permission')
export class UserTypePermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_type_permission_id: number;

  @ManyToOne(
    type => UserTypeEntity,
    usertype => usertype.userstype,
  )
  user_type_id: UserTypeEntity;

  @ManyToOne(
    type => PermissionEntity,
    Permission => Permission.Permission,
  )
  permission_id: PermissionEntity;
}
