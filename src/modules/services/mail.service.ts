import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailInterface } from '../dto/interfaces/mail/mail.interface';
import {TemplateService} from './template.service'
import * as fs from 'fs';
import * as handlebars from 'handlebars';
const nodemailer = require("nodemailer");
const testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8c491d2ca6aef9",
    pass: "37e9fdeb5d4761"
  }
});

@Injectable()
export class MailService {
  public constructor(
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly templateService: TemplateService,
  ) {}
  async Sendemail(data: any) {
    data.html = this.templateService.loadAndCompileTemplate(data.template+'.hbs', data);
    if (true) {
      console.log("mailtrap ........")
        await transporter.sendMail(data);
    }else{ 
      console.log(" SendGrid .......")
      try {
        return await this.client.send(data); 
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  async SendemailMultiple(data: MailInterface) {
    return await this.client.sendMultiple(data);
  }
}
