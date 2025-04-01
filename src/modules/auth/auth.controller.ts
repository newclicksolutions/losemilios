import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Request,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../services/user.service';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';
//import { debug } from 'util';
import { LoginUserDto } from '../auth/dto/loginuser.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../auth/dto/jwt-payload.interface';

//@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('register')
  public async register(
    @Response() res,
    @Body() createUserDto: CreateUsersDto,
  ) {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('AUTHORIZED-token')
  async verificarToken(@Body('token') token: string) {
    try {
      // Verificamos el token
      const decodedToken = await this.authService.verificarToken(token);

      // Obtenemos el usuario de la base de datos
      const user = await this.usersService.findById(decodedToken.user_id);

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Mapeamos el objeto de usuario para añadir la propiedad 'role'
      const { user_type_id, ...restOfUser } = user;
      const userWithRole = {
        ...restOfUser,
        user_type_id,  // Mantiene el objeto completo de 'user_type_id'
        role: user_type_id.user_type_id,  // Añadimos solo el ID del rol
      };

      // Devolvemos el mensaje con el usuario
      return { mensaje: 'validToken', user: userWithRole };
    } catch (error) {
      console.error('Error al verificar token:', error);
      throw new HttpException('Token no válido', HttpStatus.UNAUTHORIZED);
    }
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Response() res, @Body() login: LoginUserDto) {
    const user = await this.usersService.findByEmail(login.email);
    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found',
      });
    } else {
      //debug('start getting the token');
      const token = this.authService.createToken(user);
      //debug(token.accessToken);
      return res.status(HttpStatus.OK).json(token);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  public async getUserlogin(@Request() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
