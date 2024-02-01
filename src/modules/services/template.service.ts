// template-loader.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';

@Injectable()
export class TemplateService {
  loadAndCompileTemplate(templatePath: string, data: any): string {
    const filePath = join(process.cwd(), 'templates/', templatePath);
    const templateContent = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(templateContent);
    return template(data);
  }
}