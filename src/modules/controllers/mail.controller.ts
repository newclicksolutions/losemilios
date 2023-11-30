import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { MailInterface } from '../dto/interfaces/mail/mail.interface';

@Controller('mail')
export class MailController {
  constructor(private service: MailService) {}

  @Post() 
  create(@Body() data: MailInterface) {
    return this.service.Sendemail(data);
  }
}
