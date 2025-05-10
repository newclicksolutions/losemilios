import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ConfigEntity } from '../dto/db/config.entity';
import { ConfigInterface } from '../dto/interfaces/config/config.Interface';
import { OrderEntity } from "../dto/db/order.entity";
import { UserEntity } from "../dto/db/user.entity";

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(ConfigEntity)
    private configRepository: Repository<ConfigEntity>,
  ) { }

async getDashboardMetrics() {
  const orderRepository = getRepository(OrderEntity);
  const userRepository = getRepository(UserEntity);

  // Total de ventas hoy (solo órdenes completas)
  const totalSalesToday = await orderRepository
    .createQueryBuilder("order")
    .where("DATE(order.date_created) = CURDATE()")
    .andWhere("order.orderStatusOrderStatusId = 4")
    .select("COALESCE(SUM(order.total_sale), 0)", "total")
    .getRawOne();

  // Total de ventas ayer (solo órdenes completas)
  const totalSalesYesterday = await orderRepository
    .createQueryBuilder("order")
    .where("DATE(order.date_created) = CURDATE() - INTERVAL 1 DAY")
    .andWhere("order.orderStatusOrderStatusId = 4")
    .select("COALESCE(SUM(order.total_sale), 0)", "total")
    .getRawOne();

  // Total de usuarios registrados hoy (solo "clientes")
  const totalUsersToday = await userRepository
    .createQueryBuilder("user")
    .where("DATE(user.user_registered) = CURDATE()")
    .andWhere("user.user_type_id = 2")
    .select("COALESCE(COUNT(user.user_id), 0)", "total")
    .getRawOne();

  // Total de usuarios registrados el mismo día de la semana pasada
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekStr = lastWeek.toISOString().split("T")[0];

  const totalUsersLastWeek = await userRepository
    .createQueryBuilder("user")
    .where("DATE(user.user_registered) = :lastWeek", { lastWeek: lastWeekStr })
    .andWhere("user.user_type_id = 2")
    .select("COALESCE(COUNT(user.user_id), 0)", "total")
    .getRawOne();

  // Total de clientes en general
  const totalUsers = await userRepository
    .createQueryBuilder("user")
    .where("user.user_type_id = 2")
    .select("COUNT(user.user_id)", "total")
    .getRawOne();

  // Total de ventas en general (solo órdenes completas)
  const totalSales = await orderRepository
    .createQueryBuilder("order")
    .where("order.orderStatusOrderStatusId = 4")
    .select("COALESCE(SUM(order.total_sale), 0)", "total")
    .getRawOne();

  // Función para calcular porcentaje de cambio
  function calculatePercentage(current: number, previous: number): string {
    if (previous === 0) return "+100%";
    const percentage = ((current - previous) / previous) * 100;
    return `${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  }

  return {
    stats: {
      money: {
        title: "Total ventas hoy",
        value: `$${Number(totalSalesToday?.total || 0).toLocaleString()}`,
        percentage: calculatePercentage(
          Number(totalSalesToday?.total || 0),
          Number(totalSalesYesterday?.total || 0)
        ),
        iconClass: "ni ni-money-coins",
        detail: "Comparado con ayer",
        iconBackground: "bg-gradient-primary",
      },
      users: {
        title: "Clientes registrados hoy",
        value: `${Number(totalUsersToday?.total || 0).toLocaleString()}`,
        percentage: calculatePercentage(
          Number(totalUsersToday?.total || 0),
          Number(totalUsersLastWeek?.total || 0)
        ),
        iconClass: "ni ni-world",
        iconBackground: "bg-gradient-danger",
        detail: "Respecto a la semana pasada",
      },
      clients: {
        title: "Total de clientes",
        value: `+${Number(totalUsers?.total || 0).toLocaleString()}`,
        percentage: "-2%", // Puedes calcular esto si tienes una métrica anterior
        iconClass: "ni ni-paper-diploma",
        percentageColor: "text-danger",
        iconBackground: "bg-gradient-success",
        detail: "",
      },
      sales: {
        title: "Ventas acumuladas",
        value: `$${Number(totalSales?.total || 0).toLocaleString()}`,
        percentage: calculatePercentage(Number(totalSales?.total || 0), 0),
        iconClass: "ni ni-cart",
        iconBackground: "bg-gradient-warning",
        detail: "Totales hasta hoy",
      },
    },
  };
}


  async getone(user: ConfigInterface): Promise<ConfigInterface[]> {
    return await this.configRepository.find();
  }

  async getConfig(_id: number) {
    return await this.configRepository.findOne({
      where: [{ config_id: _id }],
    }
    );
  }

  async create(data: ConfigInterface) {
    const usertype = await this.configRepository.create(data);
    return this.configRepository.save(usertype);
  }
  async findAll() {
    return await this.configRepository.find();
  }
  async update(data: ConfigInterface) {
    return this.configRepository.save(data);
  }
  async delete(data: ConfigInterface) {
    return this.configRepository.delete(data);
  }
}
