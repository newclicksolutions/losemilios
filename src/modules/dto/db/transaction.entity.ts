import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    Timestamp,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import {OrderEntity} from './order.entity'
  import { from } from 'rxjs';

  @Entity('transaction')
  export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    transaction_id: number; 
    
    @OneToOne(
      type => OrderEntity,
      order => order.Transaction
    )
    @JoinColumn()
    order: OrderEntity;

    @Column()
    tx_value: number;

    @Column({ length: 5 })
    currency: string;

    @Column()
    transaction_state_number: number;

    @Column({ length: 45 })
    transaction_state_label: string;

    @Column({ length: 45 })
    cus: string;

    @Column({ length: 45 })
    reference_pol: string;

    @Column({ length: 245 })
    signature: string;

    @Column({ length: 60 })
    reference_code: string;

    @Column({ length: 60 })
    transaction_id_payu: string;

    @Column({ length: 45 })
    lap_payment_method: string;

    @Column({ length: 45 })
    pse_bank: string;

    @Column({ length: 245 })
    description: string;

    @Column('timestamp')
    created: Timestamp;

  }
