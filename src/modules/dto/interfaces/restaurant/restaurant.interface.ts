export interface RestaurentInterface {
  restaurant_id: number;
  reference_id: number;
  nit: string;
  name: string;
  phone: string;
  address: string;
  priority: number;
  deletedAt: Date;
}
