import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UsersInterface } from '../dto/interfaces/user/user.Interface';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
 
  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post('/userandrest/:uuid')
  async getausersandrest(@Param() params) { 
     return await this.service.UserDealerPriority(params.uuid);
  } 

  @Get('/orders/:uuid')
  async getauserorders(@Param() params) { 
     return await this.service.findOrdersById(params.uuid);
  } 
  
  //@UseGuards(AuthGuard('local'))
  @Get()
  getUserstop(@Body() data: UsersInterface) {
    return this.service.getUsers(data);
  }
  @Get('resetpassword/:email')
  restpassword(@Param() params) {
    return this.service.resetPassword(params.email);
  }
   
  @Get('valideuser/:username')
  getvaliduser(@Param() params) {
    return this.service.findusername(params.username);
  }
  @Get('validemail/:email')
  getvalidemail(@Param() params) {
    return this.service.findemail(params.email);
  }
 

  /*
dealer anly 

tipo de suse sin dealer
*/
  @Post()
  create(@Body() data: CreateUsersDto) {
    return this.service.createUser(data);
  }

  @Post('/deleteat')
  deleteat(@Body() data: UsersInterface) {
    return this.service.deleteatUser(data);
  }

  @Put()
  update(@Body() user: UsersInterface) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
