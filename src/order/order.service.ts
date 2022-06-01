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
  async create(createOrderDto: CreateOrderDto): Promise<ApiResponse> {
    try {
      const order = new this.orderModel(createOrderDto);
      return { data: await order.save(), status: 201 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      return {
        data: await this.orderModel.find().populate(['client', 'model']),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.orderModel.findById(id).populate(['client', 'model']),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<ApiResponse> {
    try {
      return {
        data: await this.orderModel.findByIdAndUpdate(id, updateOrderDto),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return { data: await this.orderModel.findByIdAndDelete(id), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
