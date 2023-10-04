import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserTypedto {
  @IsNotEmpty()
  user_type_id: number;
  @IsNotEmpty()
  user_type_name: string;
}
