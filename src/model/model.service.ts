import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelService {
  create(createModelDto: CreateModelDto) {
    return 'This action adds a new model';
  }

  findAll() {
    return `This action returns all model`;
  }

  findOne(id: string) {
    return `This action returns a #${id} model`;
  }

  update(id: string, updateModelDto: UpdateModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: string) {
    return `This action removes a #${id} model`;
  }
}
