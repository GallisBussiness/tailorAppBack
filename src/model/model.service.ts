import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelDocument, ModelEntity } from './entities/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(ModelEntity.name) private modelModel: Model<ModelDocument>,
  ) {}
  async create(createModelDto: CreateModelDto) {
    try {
      const model = new this.modelModel(createModelDto);
      return await model.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.modelModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.modelModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateModelDto: UpdateModelDto) {
    try {
      return await this.modelModel.findByIdAndUpdate(id, updateModelDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.modelModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
