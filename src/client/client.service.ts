import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/interfaces/ApiResponse';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ApiResponse> {
    try {
      const client = new this.clientModel(createClientDto);
      return { data: await client.save(), status: 201 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      return { data: await this.clientModel.find(), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      return { data: await this.clientModel.findById(id), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ApiResponse> {
    try {
      return {
        data: await this.clientModel.findByIdAndUpdate(id, updateClientDto),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.clientModel.findByIdAndDelete(id),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
