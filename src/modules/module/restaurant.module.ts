import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauratService } from '../services/restaurent.service';
import { RestaurantController } from '../controllers/restaurant.controller';
import { RestaurantEntity } from '../dto/db/restaurant.entity';
import { UsersModule } from './user.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([RestaurantEntity])],
  providers: [RestauratService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
