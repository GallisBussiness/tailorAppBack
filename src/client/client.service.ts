import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = new this.clientModel(createClientDto);
      return await client.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.clientModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.clientModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      return await this.clientModel.findByIdAndUpdate(id, updateClientDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.clientModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
