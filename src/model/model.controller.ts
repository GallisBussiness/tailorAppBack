import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlink } from 'fs';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('model')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:id')
  async create(
    @Param('id') id: string,
    @Body() createModelDto: CreateModelDto,
  ) {
    const model = await this.modelService.create(createModelDto);
    const user = await this.userService.findOne(id);
    user.models.push(model._id);
    user.save();
    return { data: model, status: 201 };
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(id, updateModelDto);
  }

  @Delete('delete/:userid/:id')
  async remove(@Param('id') id: string, @Param('userid') userid: string) {
    await this.modelService.remove(id);
    const user = await this.userService.findOne(userid);
    user.models = user.models.filter((model) => model !== id);
    user.save();
    return { data: true, status: 200 };
  }

  @Post('upload/avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const model = await this.modelService.findOne(id);
    if (model) {
      const { photo: avatar } = model;
      if (existsSync(`./uploads/models/${avatar}`))
        if (avatar !== 'default_avatar.png')
          unlink(`./uploads/${avatar}`, console.log);
    }
    model.photo = file.fieldname;
    return await model.save();
  }
}
