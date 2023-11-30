import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { RestauratService } from '../services/restaurent.service';
import { RestaurentInterface } from '../dto/interfaces/restaurant/restaurant.interface';

@Controller('restaurant')
export class RestaurantController {
  constructor(private service: RestauratService
    ) {}

  @Get(':id')
  public async get(@Param() params) {
    return this.service.getRestaurant(params.id);
  }

  @Get()
  public async getall(@Body() data: RestauratService) {
    return this.service.getrestaurants();
  }

  @Get('parent/:parent')
  public async getallparent() {
  }

  @Get('child/:hild')
  public async getallchild() {
    return this.service.findAllchlid();
  }
  
  /*
  @Post(':cont')
  gettop(@Param() params) {
    return this.service.getTopUser(params.id);
  }

  @Get()
  getUserstop(@Body() data: UserListInterface) {
    if (data) {
      return this.service.findAll();
    } else {
      return this.service.getTopUser(data);
    }
  }
*/

  @Post()
  public async create(@Body() data: RestaurentInterface) {
    return this.service.create(data);
  }

  @Post('/deleteat')
  public async deleteat(@Body() data: RestaurentInterface) {
    return this.service.deleteatRestaurant(data);
  }

  @Put()
  public async update(@Body() user: RestaurentInterface) {
    return this.service.update(user);
  }

  @Delete(':id')
  public async deleteUser(@Param() params) {
    return this.service.delete(params.id);
  }
}
