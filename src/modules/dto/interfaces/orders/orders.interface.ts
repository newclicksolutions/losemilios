export interface OrderInterface {
  order_id: number;
  order_date: Date;
  tax_amount: number;
  shipped_date: Date;
  shipping_amount: number;
  total_sale: number;
  shipping: String;
  reference_code:String;
  ship: String;
}
