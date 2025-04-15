import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Timestamp,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypeEntity } from './usertype.entity';
import { RestaurantEntity } from './restaurant.entity';
import { OrderEntity } from './order.entity';
import { UserRO } from '../interfaces/user/dto/usersro.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  reference_id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 90 })
  document: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 60 })
  user_login: string;

  @Column({ length: 250 })
  user_pass: string;

  @Column({ length: 950 })
  shipping_address: string;

  @Column({ length: 950 })
  shipping_neighborhood: string;

  @Column()
  priority: number;

  @Column({ nullable: true ,default: null})
  dealer: number;

  @Column({ nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.user_pass) {
    this.user_pass = await bcrypt.hash(this.user_pass, bcrypt.genSaltSync(10));
  }
  }
  
  @BeforeUpdate()
  async hashupdatePassword() {
    if (this.user_pass) {
      this.user_pass = await bcrypt.hash(this.user_pass, bcrypt.genSaltSync(10));
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.user_pass);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { user_id, name, last_name, email } = this;
    const responseObject: UserRO = {
      user_id,
      name,
      last_name,
      email,
    };
    return responseObject;
  }

  @Column()
  user_status: number;
 
  @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP', onUpdate: ''}) 
  user_registered: Timestamp;

  @ManyToOne(
    type => UserTypeEntity,
    user_type => user_type.userstypes,
  )
  user_type_id: UserTypeEntity;

  @ManyToMany(
    type => RestaurantEntity,
    Restaurant => Restaurant.user,
  )
  restaurant: RestaurantEntity[];

  @ManyToMany(
    type => OrderEntity,
    order => order.User,
  )
  Order: OrderEntity[];


}
