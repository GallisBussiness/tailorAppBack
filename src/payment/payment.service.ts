import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/interfaces/ApiResponse';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<ApiResponse> {
    try {
      const payment = new this.paymentModel(createPaymentDto);
      return { data: await payment.save(), status: 201 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      return {
        data: await this.paymentModel.find().populate('order'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.paymentModel.findById(id).populate('order'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<ApiResponse> {
    try {
      return {
        data: await this.paymentModel
          .findByIdAndUpdate(id, updatePaymentDto)
          .populate('order'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.paymentModel.findByIdAndDelete(id).populate('order'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
