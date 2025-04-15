import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  user_id: number;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  user_login: string;
  user_pass: string;
  user_status: number;
  // limit: number;
  shipping_address: string;
  shipping_neighborhood: string;
  document: string;
  reference_id: number;
  priority: number;
  dealer: number;
}
