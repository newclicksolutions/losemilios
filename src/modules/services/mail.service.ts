import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailInterface } from '../dto/interfaces/mail/mail.interface';
import { TemplateService } from './template.service'
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
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;
  public constructor(
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly templateService: TemplateService,

  ) {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Establecer la autenticación con API Key correctamente
    defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    // Inicializar la API para correos transaccionales
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }
  async Sendemail(data: any) {
    data.html = this.templateService.loadAndCompileTemplate(data.template + '.hbs', data);
    if (false) {
      console.log("mailtrap ........")
      await transporter.sendMail(data);
    } else {
      console.log(" SendGrid .......")
      try {
        return await this.sendEmailBrevo(data);
      } catch (error) {
        console.log(error)
      }

    }
  }

  async sendEmailBrevo(data: any) {
    const sendSmtpEmail = {
      to: [{ email: data.to }],
      sender: { name: "Los emilios", email: data.from },
      subject: data.subject,
      htmlContent: data.html,
    };

    try {
      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      return response;
    } catch (error) {
      console.error('Error sending Brevo email:', error);
      throw error;
    }
  }

  async SendemailMultiple(data: MailInterface) {
    return await this.client.sendMultiple(data);
  }
}
