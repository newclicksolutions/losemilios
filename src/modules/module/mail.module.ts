import { Module } from '@nestjs/common';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MailController } from '../controllers/mail.controller';
import { MailService } from '../services/mail.service';
import { TemplateModule } from './template.module';

@Module({
  imports: [
    TemplateModule,
    SendGridModule.forRoot({
      apiKey:
        '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',
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
