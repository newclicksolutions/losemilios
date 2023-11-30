import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailInterface } from '../dto/interfaces/mail/mail.interface';
const nodemailer = require("nodemailer");
const testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5a15a495192ccf",
    pass: "726374136ae8c0"
  }
});
@Injectable()
export class MailService {
  public constructor(
    @InjectSendGrid() private readonly client: SendGridService,
  ) {}
  async Sendemail(data: any) {
    if (process.env.MAiLENV=='true') {
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        await transporter.sendMail(data[index]);
      }
    }else{ 
      return await this.client.send(data); 
    }
  }

  async SendemailMultiple(data: MailInterface) {
    return await this.client.sendMultiple(data);
  }
}


