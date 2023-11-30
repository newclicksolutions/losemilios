import {
    Controller,
    Post,
    Body,
    Get, 
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import { PayuService } from '../services/payu.service';
import { PayuSignInterface } from '../dto/interfaces/payu/payu_sign.interface';
import { TransactionService} from '../services/transaction.service'
import { OrderService} from '../services/order.service'


  @Controller('payu')
  export class PayuController {
    constructor(private transactionservice: TransactionService,private payuservice: PayuService,private orderservice: OrderService) {}
    @Post()
    create(@Body() data:PayuSignInterface) {
        console.log(data)
        return {data:(new PayuService()).getSign(data),error:false};
    }

    @Post('/confirmation')
    async confirmation(@Body() data: any) {
      let response;
      let responsestatus;
      const order = await this.orderservice.getOrderByreference(data.reference_sale)
      const dto = {
        tx_value: data.value,
        currency: data.currency,
        transaction_state_number: data.state_pol,
        transaction_state_label:this.chamgestate(data.state_pol),
        cus: data.cus,
        reference_pol: data.reference_pol,
        signature: data.sign,
        reference_code: data.reference_sale,
        transaction_id_payu: data.transaction_id,
        lap_payment_method: data.payment_method_name,
        pse_bank: data.pse_bank,
        description: data.description,
        order:{
          order_id: order.order_id
        } 
      }
      response = dto
    if (order.reference_code == data.reference_sale) {
      const newstatus = {
        OrderStatus: this.chamgeorderstate(data.state_pol),
        order_id: order.order_id,
      }
      responsestatus =newstatus
       await this.orderservice.updateOrder(responsestatus)
      const result = await this.transactionservice.create(response)
      return { data: result, error: false };
      }else{
        return { data: "Firma no es valida ", error: true };
      }
    }
  
    chamgestate(state){
      switch (parseInt(state)) {
        case 4:
          return 'Transacción aprobada'
        case 5:
          return 'Transacción rechazada'
        case 6:
          return 'Transacción rechazada'
        case 7:
          return 'Transacción pendiente'
        case 104 :
          return 'Error'
        default:
          return '0'
        }
    }
  
    chamgeorderstate(state){
      switch (parseInt(state)) {
        case 4:
          return 2
        case 5:
          return 4
        case 6:
          return 4
        case 7:
          return 1
        case 104 :
          return 4
        default:
          return 0
        }
    }
  }
