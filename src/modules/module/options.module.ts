import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsService } from '../services/options.service';
import { OptionsController } from '../controllers/options.controller';
import { ConfigEntity } from '../dto/db/config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity])],
  providers: [OptionsService],
  controllers: [OptionsController],
  exports: [OptionsService],
})
export class optionsModule {}
