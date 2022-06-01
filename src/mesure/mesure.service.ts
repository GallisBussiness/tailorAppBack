import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/interfaces/ApiResponse';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';
import { Mesure, MesureDocument } from './entities/mesure.entity';

@Injectable()
export class MesureService {
  constructor(
    @InjectModel(Mesure.name) private mesureModel: Model<MesureDocument>,
  ) {}

  async create(createMesureDto: CreateMesureDto): Promise<ApiResponse> {
    try {
      const mesure = new this.mesureModel(createMesureDto);
      return { data: await mesure.save(), status: 201 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      return {
        data: await this.mesureModel.find().populate('client'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.mesureModel.findById(id).populate('client'),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updateMesureDto: UpdateMesureDto,
  ): Promise<ApiResponse> {
    try {
      return {
        data: await this.mesureModel.findByIdAndUpdate(id, updateMesureDto),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return {
        data: await this.mesureModel.findByIdAndDelete(id),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
