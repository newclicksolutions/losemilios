import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../dto/db/user.entity';
import { UsersInterface } from '../dto/interfaces/user/user.Interface';
import { UserListInterface } from '../dto/interfaces/user/userlist.Interface';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';
import { TemplateClient } from '../../config/template/templates';

import { throws } from 'assert';
const templateClient = new TemplateClient();

@Injectable() 
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(user: UsersInterface): Promise<UsersInterface[]> {
    const users = await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
    });

    return users;
  }




  async getTopUser(data: UserListInterface) {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
      take: 110,
      skip: 0,
    });
  }

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
      where: [{ email: userEmail }],
    });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.findOneOrFail({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
      where: [{ user_id: id }],
    });
  }

  async getUser(_id: number): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
      where: [{ user_id: _id }],
    });
  }
  /*
  async findOne(name: string): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id'],
      where: [{ user_neme: name }],
    });
  }*/

  async findOne(username: string): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
      where: [{ user_neme: name }],
    });
  }
  async findemail(email: string): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      where: [{ email: email }],
    });
  }

  async findusername(username: string): Promise<UsersInterface[]> {
    return await this.usersRepository.find({
      where: [{ user_login: username }],
    });
  }




  async createUser(data: CreateUsersDto) {
    const user = await this.usersRepository.create(data);
    const respon = await this.usersRepository.save(user);
    if (await respon.user_id) {
      //this.deliveryMail(respon.user_id, 'Creado')
      return respon;
    }
    
  }
  async findAll() {
    return await this.usersRepository.find({
      relations: ['client_type_id', 'user_type_id', 'restaurant','restaurant.Discounts','Discounts'],
    });
  }

  async resetPassword(email:string){
    try {
      const validuser = await this.findByEmail(email)
     if (validuser.email) {
     const newpass = await this.makeid(10)
     let data = [{user_id:validuser.user_id,user_pass:newpass}]
     const user = await this.usersRepository.create(data);
     const respon = await this.usersRepository.save(user);
     if (respon) {
/* Z */
      return { success: true, message: 'Success' }
     }
    }
    } catch (error) {
      return { success: false, message: error }
    }
     

  }

  async makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  async findAllQuery() {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.client_type_id', 'Client')
      .leftJoinAndSelect('users.restaurant', 'restaurants')
      .leftJoinAndSelect('users.user_type_id', 'type')
      .getMany();
  }
  async updateUser(data: UsersInterface) {
    const user = await this.usersRepository.create(data);
    const respon = await this.usersRepository.save(user);
    console.log(respon)
    if (respon.user_id) {

     // this.deliveryMail(respon.user_id, 'Actualizado')
      return respon;
    }
  }

  async deleteUser(user: UsersInterface) {
    const respont = await this.usersRepository.delete(user);
    if (respont) {

      return respont;
    }
  }

  async deleteatUser(data: UsersInterface) {
    const user = await this.usersRepository.create(data);
    const respon = await this.usersRepository.save(user);
    if (respon.user_id) {

      return respon;
    }
  }



  stado(i){
switch (i) {
  case 0:
    return 'Inactivo'
    break;
    case 1:
    return 'Registrado <br> <br> <a href="https://acre-appfront.herokuapp.com/login">Ingresa aqui, Has click en la casilla "Olvidaste la contraseña"</a>'
    break;
  default:
    break;
}
  }

  async UserDealerPriority(user: number) {
    let ID = user
    return await this.usersRepository.query('select r.restaurant_id as id,name, r.address,r.priority,"2" as type from restaurant r inner join restaurant_user_users ur on r.restaurant_id= ur.restaurantRestaurantId where ur.usersUserId = '+ID+' and r.deletedAt is null union select user_id as id, CONCAT(name," ",last_name) as name, shipping_address as address, priority,"1" as type from users where clientTypeIdClientTypeId = 1 and deletedAt is null and dealer = '+ID+'');
  }
/* 
  async deliveryMail(_ID: number, state: string) {
    const templateClient = new TemplateClient();
    const options = await this.optionsService.getConfig(1);
    try {
      const user = await this.usersRepository.find({
        relations: ['client_type_id', 'user_type_id', 'restaurant'],
        where: [{ user_id: _ID }],
      });
      await this.mailService.Sendemail([
        {
          to: user[0].email,
          from: {
            email: options.notify_email,
            name: 'Acre Comercializadora',
          },
          subject: 'Solucitud de registro',
          html: templateClient.users(
            state,
            user[0],
            state == 'Creado' ? '!Muchas gracias por registrarse¡' : 'Registro actualizado',
            state == 'Creado' ? 'Su solicitud de usuario recibida correctamente, Nuestro equipo revisara la disponibilidad de tu zona. Le enviaremos la información a su correo electronico.' : 'Tu registro se ha actualizado <br> Estado: <b>'+this.stado(user[0].user_status)+'</b>'
            )
        },
        {
          to: options.notify_email,
          from: {
            email: options.notify_email,
            name: 'Acre Admin',
          },
          subject: 'ACRE admin, Solicitud de registro',
          html: templateClient.usersAdmin(
            state,
            user[0],
            state == 'Creado' ? 'Nueva solicitud de registro' : 'Registro actualizado',
            state == 'Creado' ? 'Usuario: #'+user[0].user_id+' <br> Nombre: '+user[0].name+' <br> Correo: '+user[0].email+' <br>Tipo de cliente: '+user[0].client_type_id.client_type_name+'' : 'Usuario: #'+user[0].user_id+' Actualizado <br> Estado: <b>'+this.stado(user[0].user_status)+'</b>'
            ),
        },
      ]);
    } catch (error) {
      console.log(error)
      return error;
    }
  } */
}
