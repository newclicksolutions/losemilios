import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
@Entity('config')
export class ConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  config_id: number;
  
  @Column({ length: 90 })
  notify_email: string;

  @Column({ length: 90 })
  admin_email: string;

  @Column({ length: 50 })
  date_format: string;

  @Column({ length: 50 })
  time_format: string;

  @Column()
  shipvalue: number;

  @Column()
  dealertip: number;

  @Column({ length: 250 })
  ordercreated_email_message: string;

  @Column({ length: 250 })
  orderupdate_email_message: string;

  @Column({ length: 250 })
  notify_email_message: string;

  @Column({ length: 250 })
  siteurl: string;

  @Column({ length: 250 })
  apiurl: string;

  @Column({ length: 250 })
  payu_apikey: string;

  @Column({ length: 250 })
  payu_apilogin: string;

  @Column({ length: 250 })
  payu_merchant_id: string;

  @Column({ length: 250 })
  payu_accountId: string;

  @Column({ length: 250 })
  payu_url: string;

  @Column()
  payu_test: number;

  @Column()
  payu_enabled: number;

  @Column({ length: 250 })
  payQR: string;

  @Column({ length: 250 })
  payQRdescription: string;

  @Column({ length: 950 })
  optionsproducts: string;

  @Column({ length: 950 })
  neighborhood_list: string;

  @Column({ length: 950 })
  configOptions: string;

  @Column({ length: 250 })
  sendgrid_apikey: string;
}
