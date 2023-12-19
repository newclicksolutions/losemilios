import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeProductService } from '../services/typeproduct.service';
import { CategoryEntity } from '../dto/db/category.entity';
import { TypeProdutController } from '../controllers/typeprodut.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [TypeProductService],
  controllers: [TypeProdutController],
  exports:[TypeProductService],
})
export class TypeProductModule {}
