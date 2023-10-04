export interface UsersInterface {
  user_id: number;
  name: string;
  last_name: string;
  phone: string;
  document: string;
  reference_id: number;
  email: string;
  user_login: string;
  user_pass: string;
  user_status: number;
  shipping_address: string;
  priority: number;
  dealer: number;
  deletedAt: Date;
  // limit: number;
}
