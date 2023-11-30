import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { OptionsService } from '../services/options.service';
import { ConfigInterface } from '../dto/interfaces/config/config.Interface';

@Controller('options')
export class OptionsController {
  constructor(private service: OptionsService) {}

  @Get()
  getall(): any {
    return this.service.findAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this.service.getone(params.id);
  }

  @Post()
  create(@Body() data: ConfigInterface) {
    return this.service.create(data);
    console.log(data);
  }

  @Put()
  update(@Body() data: ConfigInterface) {
    return this.service.update(data);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.service.delete(params.id);
  }
}
