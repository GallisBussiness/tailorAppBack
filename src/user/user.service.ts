import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const doc = await this.userModel.create(createUserDto);
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(doc.password, salt);
      return await doc.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.userModel
        .find()
        .populate(['clients', 'models', 'orders', 'payments']);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async login(username: string) {
    try {
      return await this.userModel
        .findOne({ tel: username })
        .populate(['clients', 'models', 'orders', 'payments']);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel
        .findById(id)
        .populate(['clients', 'models', 'orders', 'payments']);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
