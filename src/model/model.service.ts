import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/interfaces/ApiResponse';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelDocument, ModelEntity } from './entities/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(ModelEntity.name) private modelModel: Model<ModelDocument>,
  ) {}
  async create(createModelDto: CreateModelDto): Promise<ApiResponse> {
    try {
      const model = new this.modelModel(createModelDto);
      return { data: await model.save(), status: 201 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      return { data: await this.modelModel.find(), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<ApiResponse> {
    try {
      return { data: await this.modelModel.findById(id), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    updateModelDto: UpdateModelDto,
  ): Promise<ApiResponse> {
    try {
      return {
        data: await this.modelModel.findByIdAndUpdate(id, updateModelDto),
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      return { data: await this.modelModel.findByIdAndDelete(id), status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
