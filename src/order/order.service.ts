import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/interfaces/ApiResponse';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = new this.orderModel(createOrderDto);
      return await order.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.orderModel.find().populate(['client', 'model']);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.orderModel.findById(id).populate(['client', 'model']);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return await this.orderModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
