import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/user.service';
import { UsersController } from '../controllers/user.controller';
import { UserEntity } from '../dto/db/user.entity';
import { MailModule } from './mail.module';
import { optionsModule } from './options.module';

@Module({
  imports: [MailModule,optionsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
