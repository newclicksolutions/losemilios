import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { OrderEntity } from '../dto/db/order.entity';
import { MailService } from '../services/mail.service';
import { OrderProductService } from '../services/orderproduct.service';
import { OrderInterface } from '../dto/interfaces/orders/orders.interface';
import { CreateOrderInterface } from '../dto/interfaces/orders/createorders.interface';
import { TemplateClient } from '../../config/template/templates';
import { OptionsService } from '../services/options.service';
import { Pagination } from '../dto/interfaces/pagination.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepository: Repository<OrderEntity>,
    private readonly orderProductService: OrderProductService,
    private readonly mailService: MailService,
    private readonly optionsService: OptionsService,
  ) {}

  async getOrders(data: Pagination) {
    const total= await this.OrderRepository.count();
    const orders = await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction', 
      ],
      skip: data.skip,
      take: data.take,
      order: {
        date_created: 'DESC',
      },
    });
    return {totalregistros: total,totalpages: Math.round(total/data.take) , data:orders};
  }


async getOrderByYear() {
  const months = [
    'Ene', 'Fe', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];

  const queryBuilder = this.OrderRepository.createQueryBuilder('o');
    queryBuilder
      .select('EXTRACT(YEAR FROM o.date_created) as year')
      .addSelect('MONTHNAME(o.date_created) as month')
      .addSelect('COUNT(*) as pedidos')
      .addSelect('COALESCE(SUM(o.total_sale), 0) as total_orders')
      .andWhere('o.orderStatusOrderStatusId = 4')
      .groupBy('year, month')
      .orderBy('year, month');

    for (const month of months) {
      queryBuilder
        .addSelect('EXTRACT(YEAR FROM o.date_created) as year')
        .addSelect('MONTHNAME(o.date_created) as month')
        .addSelect('COUNT(*) as pedidos')
        .addSelect('COALESCE(SUM(o.total_sale), 0) as total_orders')
        .orWhere(`(EXTRACT(YEAR FROM o.date_created) = EXTRACT(YEAR FROM CURRENT_DATE()) AND MONTHNAME(o.date_created) = :month) OR o.order_id IS NULL`, { month })
        .andWhere('o.orderStatusOrderStatusId = 4')
        .groupBy('year, month');
    }

    return await queryBuilder.getRawMany();
 // return await this.OrderRepository.query('SELECT YEAR(date_created) AS year, MONTHNAME(date_created) AS month, SUM(total_sale) AS total_orders FROM orders WHERE orderStatusOrderStatusId = 4 GROUP BY month, month ORDER BY year, month;');
}

async getOrdersdeliveryBydate(order: any) {
  let ID = order.state;
  return await this.OrderRepository.query('select o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name as nameproduct,op.quantity,op.price,op.nota,op.unit, case   when o.restaurantRestaurantId  is null then CONCAT(u.name," ",u.last_name) when o.restaurantRestaurantId  >= 1 then r.name  else 0 end as name, case   when o.restaurantRestaurantId  is null then u.priority when o.restaurantRestaurantId  >= 1 then r.priority   else 0 end as priority, case when o.restaurantRestaurantId  is null then IFNULL(CONCAT(d.name," ",d.last_name),"Sin Repartidor")  when o.restaurantRestaurantId  >= 1 then IFNULL(dr.dealer,"Sin Repartidor") else 0 end as dealer from orders o  inner join order_products op on o.order_id=op.orderOrderId left join users u on o.userUserId=u.user_id left join users d on u.dealer=d.user_id left join (select u.user_id, r.name, r.priority, concat(u.name, " ", u.last_name) as dealer, r.restaurant_id from users u left join restaurant_user_users ru on ru.usersUserId = u.user_id  inner join restaurant r on r.restaurant_id=ru.restaurantRestaurantId where u.userTypeIdUserTypeId = 4 group by r.name, r.priority,r.restaurant_id having max(u.user_id)) dr on dr.restaurant_id = o.restaurantRestaurantId left join restaurant r on r.restaurant_id=o.restaurantRestaurantId where o.orderStatusOrderStatusId = "'+ID+'"  group by o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name,op.quantity,op.price,op.nota,op.unit,o.restaurantRestaurantId,u.priority, r.priority,u.name,u.last_name, r.name  ,d.name,d.last_name,dr.dealer order by dealer, priority');
}

  async getOrdersdeliveryBydate2(order: any) {
    let ID = order.state;
    let UID = order.user_id;
    return await this.OrderRepository.query('select o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name as nameproduct,op.quantity,op.price,op.nota,op.unit,r.name,r.priority from orders o inner join order_products op on o.order_id=op.orderOrderId inner join restaurant r on r.restaurant_id=o.restaurantRestaurantId inner join restaurant_user_users ur on ur.restaurantRestaurantId=o.restaurantRestaurantId where o.orderStatusOrderStatusId = "'+ID+'"  and ur.usersUserId = "'+UID+'" union select o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name as nameproduct,op.quantity,op.price,op.nota,op.unit, CONCAT(u.name," ",u.last_name) as name,u.priority from orders o inner join order_products op on o.order_id=op.orderOrderId inner join users u on u.user_id=o.userUserId where o.orderStatusOrderStatusId = "'+ID+'"  and u.dealer = "'+UID+'"');
  }

  async getOrdersdeliveryBydateall(order: any) {
    let ID = order.state;
    let UID = order.user_id;
    return await this.OrderRepository.query('select o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name as nameproduct,op.quantity,op.price,op.nota,op.unit,r.name,r.priority, CONCAT(u.name," ",u.last_name) as dealer from orders o inner join order_products op on o.order_id=op.orderOrderId inner join restaurant r on r.restaurant_id=o.restaurantRestaurantId inner join restaurant_user_users ur on ur.restaurantRestaurantId=o.restaurantRestaurantId inner join users u on u.user_id = ur.usersUserId where o.orderStatusOrderStatusId = "'+ID+'"  and ur.usersUserId = "'+UID+'" group by o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name, op.quantity,op.price,op.nota,op.unit,r.name,r.priority  union select o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name as nameproduct,op.quantity,op.price,op.nota,op.unit, CONCAT(u.name," ",u.last_name) as name,u.priority, CONCAT(d.name," ",d.last_name) as dealer from orders o inner join order_products op on o.order_id=op.orderOrderId inner join users u on u.user_id=o.userUserId inner join users d on d.user_id=u.dealer where o.orderStatusOrderStatusId = "'+ID+'" and u.dealer = "'+UID+'"  group by o.order_date,o.order_id,o.shipping,o.tax_amount,o.total_sale,op.sku, op.name,op.quantity,op.price,op.nota,op.unit,u.name,u.last_name');
}


async getBybuyorder(order: any) {
  let ID = order.state;
  return await this.OrderRepository.query('select CONCAT(p.name," ",sku.name) as name,op.sku,op.unit, sum(op.quantity) as cantidad, IFNULL(i.stock_quantity,0) as CantidadKL, IFNULL(i.unit_stock_quantity,0) as Equivalencia, case op.unit when "KL" then sum(op.quantity)-IFNULL(i.stock_quantity,0) when "Uni" then sum(op.quantity)-IFNULL(i.unit_stock_quantity,0) else 0 end as Comprar from orders o inner join (select op.sku,op.name,"KL" as unit,op.orderOrderId,op.productProductId, case unit when "KL" then quantity when "GR" then  (quantity/1000) when "Uni" then (quantity * IFNULL(i.unit_stock_quantity,0)) else 0 end as quantity from orders o join order_products op  on o.order_id = op.orderOrderId join sku_product sku on sku.sku=op.sku left join inventory i on i.productskuSkuProductId=sku.sku_product_id where date(o.order_date) BETWEEN (CURDATE() - INTERVAL 3 DAY) AND CURDATE() and o.orderStatusOrderStatusId = "'+ID+'" order by o.order_date desc) op on o.order_id=op.orderOrderId inner join sku_product sku on op.sku=sku.sku inner join products p on p.product_id = sku.productIdProductId left join inventory i on i.productskuSkuProductId=sku.sku_product_id where sku.deletedAt is null and o.orderStatusOrderStatusId = "'+ID+'" and date(o.order_date) BETWEEN (CURDATE() - INTERVAL 3 DAY) AND CURDATE() GROUP BY op.unit,op.sku, i.stock_quantity,sku.name,i.unit_stock_quantity having sum(op.quantity) > i.stock_quantity');
}

  async getByheader(order: any) {
    let ID = order.state;
    return await this.OrderRepository.query('select DATE_FORMAT(order_date, "%d/%m/%y") as "Fecha Cotización", order_id as "Número de Cotización", DATE_FORMAT(order_date, "%d/%m/%y") as "Fecha de Vigencia", "" as "Vigencia En Días", "002" as "Concepto Factura",IFNULL(r.reference_id,u.reference_id) as Cliente,IFNULL(r.nit,u.document) as "Nit Cliente", IFNULL(r.name,CONCAT(u.name,"" ,u.last_name)) as "Nombre Cliente","01" as Vendedor,"N" as "Tipo Mensaje", "" as "Codigo Mensaje", "001" as Usuario, "" as "Centro de Costo Gene", "02" as "Lista de Precios", 8 as Plazo, "0" as "Descuento Comercial", "0" as "Descuento en Valor",0 as "Base Retención Iva",99 as "Tipo Descuento PPP", o.shipping as "Dirección", o.shipping as "Dirección Envío", "" as "Transportador", 0 as Acarreos, 99 as "Tipo Retención en la", 99 as "Tipo Retención Iva A", "0" as "Seguros", 99 as "Tipo Iva Seguros",99 as "Tipo Retención en la  ",99 as "Tipo Retención Iva S", "0" as "Fletes",99 as "Tipo Iva Fletes",99 as "Tipo Retención en la ", 99 as "Tipo Retención Iva F", 99 as "Tipo Retención Iva", 0 as "Documento Referencia",IFNULL(od.quantity,0) as "Cantidad Total", (o.total_sale+o.tax_amount) as "Valor Total Cotizaci","D"as "Estado", "01" as "Zona", "" as Macrozona, "" as Canal, "" as "Sector Dane", 2 as "Forma Pago", "N" as "Impreso","" as "Codigo Origen", "" as    "Codigo Motivo", "" as  "Fecha Ultima Modific", "" as "Aplicacion Origen", "" as  "Fecha Confirmacion", "" as    "Condicion Pago", "" as    "Descripcion Cotizaci", "" as  "Telefono Envio", 99 as "Tipo AIU Administrat", 99 as   "Tipo AIU Imprevistos", 99 as "Tipo AIU Utilidad", 99 as  "IVA AIU", 99 as   "AIU Incluido", 99 as  "Tipo Retencion AIU", 99 as    "Tipo Retencion CREE", "" as   "Centro de Costo NIIF", 99 as "Tipo Retencion CREE " from orders o  left join restaurant r on r.restaurant_id = o.restaurantRestaurantId left join users u on u.user_id = o.userUserId left join (select op.orderOrderId, sum(case unit when "KL" then quantity when "GR" then (quantity/1000) when "Uni" then (quantity * i.unit_stock_quantity) else 0 end) as quantity from order_products op inner join sku_product sku on sku.sku=op.sku inner join inventory i on i.productskuSkuProductId=sku.sku_product_id inner join orders o on o.order_id = op.orderOrderId where date(o.order_date) BETWEEN (CURDATE() - INTERVAL 3 DAY) AND CURDATE() group by op.orderOrderId) od on od.orderOrderId = o.order_id where o.orderStatusOrderStatusId = "'+ID+'" and date(o.order_date) BETWEEN (CURDATE() - INTERVAL 3 DAY) AND CURDATE()');
  }

async getByheadervariant(order: any) {
  let ID = order.state;
  return await this.OrderRepository.query('select sku.orderOrderId as "Número Cotizacion",IFNULL(r.reference_id,u.reference_id) as Cliente, "01" as "Bodega", sku.sku as "Referencia", "" as "Código Barras", sku.name as "Descripcion Referenc", "KL" as "Unidad de Venta" , case sku.unit when "KL" then sku.quantity when "GR" then  (sku.quantity/1000) when "Uni" then (sku.quantity * i.unit_stock_quantity) else 0 end as "CANTIDAD COTIZADA", "02" as "LP del detalle",case sku.unit when "KL" then sku.price when "GR" then  sku.price*1000 when "Uni" then (1 * sku.price)/i.unit_stock_quantity else 0 end as "Base Unitaria", "1" as "Tasa Cambio", case sku.unit when "KL" then sku.price when "GR" then  sku.price*1000 when "Uni" then (1 * sku.price)/i.unit_stock_quantity else 0 end as "Precio","0" as "Descuento",99 as "Tipo de Iva", 99 as "Tipo de Retención","" as "Descripción Ampliada","" as "Fecha de Cierre","" as "Número de Fila","" as "Centro de costos del","0" as "Valor Ipoconsumo", "0" as "Valor Estampillas", "" as Version, "0" as "CantidadConfirmada", 99 as "Tipo de Impuesto Con", 99 as "Tipo de Retencion CR","" as "Centro de costos NII", "" as " Factor de Conversión",99 as "Tipo Retención en la",99 as "Tipo Retención Iva S",0 as "Fletes",99 as "Tipo Iva Fletes",99 as "Tipo Retención en la ", 99 as "Tipo Retención Iva F",99 as "Tipo Retención Iva",0 as "Documento Referencia", case sku.unit when "KL" then sku.quantity when "GR" then  (sku.quantity/1000) when "Uni" then (sku.quantity * i.unit_stock_quantity) else 0 end as "Cantidad Total", sku.quantity*sku.price as "Valor Total Cotizaci", "D" as "Estado", 1 as "Zona", "" as "Macrozona", "" as"Canal","" as "Sector Dane", 2 as "Forma Pago", "N" as "Impreso", "" as "Codigo Origen", "" as "Codigo Motivo", "" as "Fecha Ultima Modific", "" as "Aplicacion Origen","" as "Fecha Confirmacion", "" as "Condicion Pago", "" as "Descripcion Cotizaci", "" as "Telefono Envio", 99 as "Tipo AIU Administrat", 99 as "Tipo AIU Imprevistos", 99 as "Tipo AIU Utilidad", 99 as "IVA AIU","" as "AIU Incluido", 99 as "Tipo Retencion AIU", 99 as "Tipo Retencion CREE", "" as "Centro de Costo NIIF", 99 as "Tipo Retencion CREE " from order_products sku inner join orders o on sku.orderOrderId = o.order_id left join restaurant r on r.restaurant_id = o.restaurantRestaurantId left join users u on u.user_id = o.userUserId left join sku_product skuprod on skuprod.sku = sku.sku and skuprod.productIdProductId=sku.productProductId left join inventory i on i.productskuSkuProductId = skuprod.sku_product_id where o.orderStatusOrderStatusId = "' + ID + '" and date(o.order_date) BETWEEN (CURDATE() - INTERVAL 3 DAY) AND CURDATE()');
}


  async updateState(order: any) {
    let ID = order.state;
    let value1 = order.r1;
    let value2 = order.r2;
    var list = [];
      for (var i = order.r1; i <= order.r2; i++) {
         list.push(i);}
    const query =  await this.OrderRepository.createQueryBuilder('orders')
    .update()
    .set({OrderStatus:{order_status_id:ID}})
    .where('orders.order_id BETWEEN :value1 AND :value2',{value1,value2},)
    .execute();
    if (query) {
      if (list.length<=90) {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
        }
        return query
      } else {
        return query
      }
     // 
      
    }
  }

  async getMaxId() {
    const query = this.OrderRepository.createQueryBuilder('orders');
    query.select('MAX(order_id)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  async UpdateIndex() {
    const orders = await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
    });
    try {
      if (orders) {

      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }










 


  
  async getOrderByreference(reference: string){
    return await this.OrderRepository.findOne({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [{ reference_code: reference }],
    });
  }




  async getOrder(_id: number): Promise<OrderInterface[]> {
    return await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [{ order_id: _id }],
    });
  }

  async getOrdereasy(_id: number): Promise<OrderInterface[]> {
    return await this.OrderRepository.find({
      select:['shipping'],
      relations: [
        'orderproduct',
      ],
      where: [{ order_id: _id }],
    });
  }
  async getOrderbyID(_id: number) {
    return await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [{ order_id: _id }],
    });
  }

  async getOrderbyUser(_id: number) {
    return await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [{ User: _id }],
    });
  }
  async getOrderbyEmail(_id: string) {
    return await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [{ customeremail: _id }],
    });
  }

  async getOrdersUser(order: OrderInterface): Promise<OrderInterface[]> {
    return await this.OrderRepository.find({
      relations: [
        'User',
        'User.user_type_id',
        'OrderStatus',
        'Paymethod',
        'orderproduct',
        'orderproduct.product',
        'Restaurant',
        'Transaction',
      ],
      where: [order],
    });
  }

  async createOrder(data: CreateOrderInterface) {
    try {
      const orders = await this.OrderRepository.create(data);
      const result = await this.OrderRepository.save(orders);
      console.log(data.orderproduct)
      if (result.order_id) {
        for (let index = 0; index < data.orderproduct.length; index++) {
          const dataset = {
            sku: data.orderproduct[index].sku,
            quantity: data.orderproduct[index].quantity,
            price: data.orderproduct[index].price,
            total: data.orderproduct[index].total,
            totaladitions: data.orderproduct[index].totaladitions,
            unit: data.orderproduct[index].unit,
            name: data.orderproduct[index].name,
            nota: data.orderproduct[index].nota,
            aditions: data.orderproduct[index].aditions,
            product: { 
              product_id: data.orderproduct[index].product_id,
            },
            order: {
              order_id: result.order_id,
            },
          };
         
          await this.orderProductService.CreateOrderProdut(dataset);
        }
    //    this.deliveryMail(result.order_id, 'Creado');
        return orders;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deliveryMail(_ID: number, state: string) {
    const templateClient = new TemplateClient();
    const options = await this.optionsService.getConfig(1);
    try {
      const orders = await this.OrderRepository.find({
        relations: [
          'User',
          'User.user_type_id',
          'OrderStatus',
          'Paymethod',
          'orderproduct',
          'orderproduct.product',
          'Restaurant',
          'Transaction',
        ],
        where: [{ order_id: _ID }],
      });
      await this.mailService.Sendemail([
        {
          to: orders[0].User[0].email,
          from: {
            email: options.notify_email,
            name: 'Acre Comercializadora',
          },
          subject: 'Su pedido #' + orders[0].order_id + ' fue ' + state + '!',
          html: templateClient.Orders(
            state,
            orders[0],
            state == 'Creado'
              ? options.ordercreated_email_message
              : options.orderupdate_email_message,
          ),
        }
/*         {
          to: "notify@admin.co",
          from: {
            email: options.notify_email,
            name: 'Acre Admin',
          },
          subject: 'ACRE admin, Pedido ' + state + '',
          html: templateClient.OrdersAdmin(
            state,
            orders[0],
            state == 'Creado'
              ? options.notify_email_message
              : options.orderupdate_email_message,
          ),
        }, */
      ]);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateOrder(data: OrderInterface) {
    const orders = await this.OrderRepository.create(data);
    const result = await this.OrderRepository.save(orders);
    var list = [];
    try {
      if (result) {
        await this.orderProductService.CreateOrderProdut(data.orderproduct)
        list.push(data)
        if (list[0].length<=90) {
          for (let index = 0; index < list[0].length; index++) {
            const element = list[0][index];
            console.log(element.order_id)
          } 
         // this.deliveryMail(result.order_id, 'Actualizado');
          return result;
        } else {
        //  this.deliveryMail(result.order_id, 'Actualizado');
          return result;
        }
       // const resultindex = await this.UpdateIndex(); 
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteOrder(data: OrderInterface) {
    const result = this.OrderRepository.delete(data);
    try {
      if (result) {
        // await this.UpdateIndex();
        return result;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
