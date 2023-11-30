import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { UserTypePermissionEntity } from './permissionusertype.entity';
import { UserEntity } from './user.entity';

@Entity('user_type')
export class UserTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_type_id: number;

  @Column({ length: 50 })
  user_type_name: string;

  @OneToMany(
    type => UserTypePermissionEntity,
    UserType => UserType.user_type_id,
  )
  userstype: UserTypePermissionEntity[];

  @OneToMany(
    type => UserEntity,
    UserType => UserType.user_type_id,
  )
  userstypes: UserEntity[];
}
