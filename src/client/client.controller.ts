import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlink } from 'fs';
import { UserService } from 'src/user/user.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:id')
  async create(
    @Param('id') id: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    const client = await this.clientService.create(createClientDto);
    const user = await this.userService.findOne(id);
    user.clients.push(client._id);
    user.save();
    return client;
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete('delete/:userid/:id')
  async remove(@Param('id') id: string, @Param('userid') userid: string) {
    try {
      await this.clientService.remove(id);
      const user = await this.userService.findOne(userid);
      user.models = user.models.filter((model) => model !== id);
      user.save();
      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post('upload/avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const client = await this.clientService.findOne(id);
    if (client) {
      const { avatar } = client;
      if (existsSync(`./uploads/clients/${avatar}`))
        if (avatar !== 'default_avatar.png')
          unlink(`./uploads/${avatar}`, console.log);
    }
    client.avatar = file.fieldname;
    return await client.save();
  }
}
