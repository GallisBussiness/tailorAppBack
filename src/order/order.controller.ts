import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:id')
  async create(
    @Param('id') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.orderService.create(createOrderDto);
    const user = await this.userService.findOne(id);
    user.orders.push(order._id);
    user.save();
    return { data: order, status: 201 };
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('delete/:userid/:id')
  async remove(@Param('id') id: string, @Param('userid') userid: string) {
    try {
      await this.orderService.remove(id);
      const user = await this.userService.findOne(userid);
      user.orders = user.orders.filter((order) => order !== id);
      user.save();
      return { data: true, status: 200 };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
