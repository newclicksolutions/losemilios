import { Module } from '@nestjs/common';
import { PayuService } from '../services/payu.service';
import { PayuController } from '../controllers/payu.controller';
import { TransactionModule} from '../module/transaction.module'
import { OrderModule} from '../module/order.module'
@Module({
  imports: [OrderModule,TransactionModule],
  providers: [PayuService],
  controllers: [PayuController],
})
export class PayuModule {}
