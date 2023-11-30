import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionEntity } from '../dto/db/transaction.entity';
import { MailModule } from './mail.module';
import { optionsModule } from './options.module';

@Module({
  imports: [optionsModule,MailModule,TypeOrmModule.forFeature([TransactionEntity])],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
