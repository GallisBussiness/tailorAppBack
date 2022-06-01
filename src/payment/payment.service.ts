import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
