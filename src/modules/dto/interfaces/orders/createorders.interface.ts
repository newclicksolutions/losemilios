import {OrderProductInterface} from '../orders/ordersproduct.interface'
export interface CreateOrderInterface  extends OrderProductInterface{
  order_id: number;
  order_date: Date;
  tax_amount: number;
  shipped_date: Date;
  shipping_amount: number;
  tiping_amount: number;
  subtotal: number;
  total_sale: number;
  shipping: String;
  reference_code:String;
  customername: String;
  customertel: String;
  customeremail: String;
  ship: String;
  orderproduct 
}
 