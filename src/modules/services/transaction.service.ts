import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../dto/db/transaction.entity';
import { TransactionInterface } from '../dto/interfaces/transaction/transaction.interface';
import { MailService } from '../services/mail.service';
import { TemplateClient } from '../../config/template/templates';
import { OptionsService } from '../services/options.service';
import { OrderService } from '../services/order.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private readonly mailService: MailService,
    private readonly orderService: OrderService,
    private readonly optionsService: OptionsService,
  ) { }

  async getOne(transaction: TransactionInterface): Promise<TransactionInterface[]> {
    return await this.transactionRepository.find();
  }

  async findbyOne(transaction: number) {
    return await this.transactionRepository.createQueryBuilder('transaction')
      .where('orderOrderId = :transaction', { transaction })
      .getOne();
  }

  async create(data: TransactionInterface) {
    try {
      const existingTransaction = await this.findbyOne(data.order.order_id);

      if (existingTransaction) {
        data.transaction_id = existingTransaction.transaction_id;
      }
      const transaction = this.transactionRepository.create(data);
      const savedTransaction = await this.transactionRepository.save(transaction);
      const orderId = savedTransaction.order?.order_id;
      if (!orderId) {
        console.warn('Orden no encontrada en la transacción guardada');
        return savedTransaction;
      }
      const paymentState = savedTransaction.transaction_state_number;
      let newOrderState: number;
      switch (paymentState) {
        case 4: // Transacción aprobada
        case 7: // Pendiente
        case 12: // Aguardando confirmación
          newOrderState = 2; // En proceso
          break;
        case 6: // Rechazada o cancelada
        case 104:
        case 5:
          newOrderState = 6; // Cancelado
          break;
        default:
          newOrderState = 1; // Por defecto, en proceso
          console.warn(`Estado de transacción no mapeado: ${paymentState}`);
      }

      await this.orderService.updateState(orderId, newOrderState);

      return savedTransaction;

    } catch (error) {
      console.error('Error al crear transacción:', error);
      throw new Error('No se pudo crear o actualizar la transacción');
    }
  }


  async deliveryMail(_ID: number) {
    const templateClient = new TemplateClient();
    const options = await this.optionsService.getConfig(1);
    try {
      const transaccion = await this.transactionRepository.find({
        relations: ['order', 'order.User'],
        where: [{ transaction_id: _ID }],
      });
      await this.mailService.Sendemail([
        {
          to: transaccion[0].order.User[0].email,
          from: {
            email: options.notify_email,
            name: 'Los emilios',
          },
          subject: 'La transacción del su pedido #' + transaccion[0].order.order_id + ' fue ' + transaccion[0].transaction_state_label + '!',
          html: templateClient.transaccion(
            transaccion[0],
            transaccion[0].order.order_id
          )
        },
        {
          to: options.notify_email,
          from: {
            email: options.notify_email,
            name: 'Los emilios',
          },
          subject: 'La transacción del pedido #' + transaccion[0].order.order_id + ' fue ' + transaccion[0].transaction_state_label + '!',
          html: templateClient.transaccion(
            transaccion[0],
            transaccion[0].order.order_id
          ),
        },
      ])
    } catch (error) {
      console.log(error)
      return error;
    }
  }
  async findbyID(_id: number) {
    return await this.transactionRepository.find({
      relations: ['order', 'order.User'],
      where: [{ transaction_id: _id }],
    });
  }

  async findAll() {
    return await this.transactionRepository.find({
      relations: ['order', 'order.User']
    });
  }

  async update(data: TransactionInterface) {
    this.transactionRepository.save(data);
  }

  async delete(data: TransactionInterface) {
    this.transactionRepository.delete(data);
  }
}
