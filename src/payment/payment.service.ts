import { HttpException, Injectable } from '@nestjs/common';
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

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = new this.paymentModel(createPaymentDto);
      return await payment.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.paymentModel.find().populate('order');
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.paymentModel.findById(id).populate('order');
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.paymentModel
        .findByIdAndUpdate(id, updatePaymentDto)
        .populate('order');
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.paymentModel.findByIdAndDelete(id).populate('order');
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
