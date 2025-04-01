import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { JwtPayload } from './dto/jwt-payload.interface';
import { UserEntity } from '../dto/db/user.entity';
import { UserRO } from '../dto/interfaces/user/dto/usersro.dto';
import { debug } from 'console';
import { RegistrationStatus } from './dto/registrationStatus.interface';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';
import { compare, compareSync } from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  private readonly claveSecreta = 'Codebrains';
  private readonly logger = new Logger(AuthService.name);

  async register(user: CreateUsersDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.createUser(user);
    } catch (err) {
      //debug(err);
      status = { success: false, message: err };
    }
    return status;
  }

  verificarToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.claveSecreta, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
  createToken(user: UserEntity) {
    //debug('get the expiration');
    const expiresIn = 129600;
    //debug('sign the token');
    //debug(user);

    const accessToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        last_name: user.last_name,
      },
      'Codebrains',
      { expiresIn },
    );
    //debug('return the token');
    //debug(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<UserEntity> {
    return await this.usersService.findById(payload.user_id);
  }
  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.usersService.findByEmail(email);
   
    const isMatch = await compareSync(password, user.user_pass);
    console.log(isMatch)
    if (user.user_status==1 && isMatch) {
      this.logger.log('password check success');
      const { user_pass, ...result } = user;
      return result;
    }
    return null;
  }
}
