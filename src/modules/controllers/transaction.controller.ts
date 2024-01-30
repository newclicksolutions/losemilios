import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { TransactionInterface } from '../dto/interfaces/transaction/transaction.interface';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}
  @Post()
  create(@Body() data: TransactionInterface) {
    return this.service.create(data);
  }

  @Get()
  getTransaction() {
    return this.service.findAll();
  }
  @Get('/payu')
  createTransactionget(
    @Query('TX_VALUE') TX_VALUE: number,
    @Query('currency') currency: string,
    @Query('transactionState') transactionState: number,
    @Query('lapTransactionState') lapTransactionState: string,
    @Query('cus') cus: string,
    @Query('reference_pol') reference_pol: string,
    @Query('signature') signature: string,
    @Query('referenceCode') referenceCode: string,
    @Query('transactionId') transactionId: string,
    @Query('lapPaymentMethodType') lapPaymentMethodType: string,
    @Query('pseBank') pseBank: string,
    @Query('description') description: string,
  ) {
    const data = {
      order: { order_id: referenceCode },
      tx_value: TX_VALUE,
      currency: currency,
      transaction_state_number: transactionState,
      transaction_state_label: lapTransactionState,
      cus: cus,
      reference_pol: reference_pol,
      signature: signature,
      reference_code: referenceCode,
      transaction_id_payu: transactionId,
      lap_payment_method: lapPaymentMethodType,
      pse_bank: pseBank,
      description: description,
    };
    console.log('payU confirmation Url');
    return this.service.create(data);
  }

  @Post('/payu')
  createTransactionpost(@Body() datos: any) {
    {
      const dataSet = {
        order: { order_id: datos.reference_sale },
        tx_value: datos.value,
        currency: datos.currency,
        transaction_state_number: datos.state_pol,
        transaction_state_label: datos.response_message_pol,
        cus: datos.payment_request_state,
        reference_pol: datos.reference_pol,
        signature: datos.sign,
        reference_code: datos.reference_sale,
        transaction_id_payu: datos.transaction_id,
        lap_payment_method: datos.payment_method_name,
        pse_bank: datos.pse_bank,
        description: datos.description,
      };
      console.log('------------------------------------------------------');
      console.log('payU confirmation Url');
      console.log(datos);
      console.log('------------------------------------------------------');
      return this.service.create(dataSet);
    }
  }
}
