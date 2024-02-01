import { Module } from '@nestjs/common';
import { TemplateService } from '../services/template.service';


@Module({
  providers: [TemplateService],
  exports: [TemplateService]
})
export class TemplateModule {}
