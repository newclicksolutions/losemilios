
export class CreateProdutcDto {
  product_id: number;
  name: string;
  tax: number;
  price: number;
  description: string;
  unit: string;
  deleteAt?: Date;
}