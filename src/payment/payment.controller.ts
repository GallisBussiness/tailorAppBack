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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:id')
  async create(
    @Param('id') id: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    const payment = await this.paymentService.create(createPaymentDto);
    const user = await this.userService.findOne(id);
    user.payments.push(payment._id);
    user.save();
    return { data: payment, status: 201 };
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete('delete/:userid/:id')
  async remove(@Param('id') id: string, @Param('userid') userid: string) {
    try {
      await this.paymentService.remove(id);
      const user = await this.userService.findOne(userid);
      user.payments = user.payments.filter((pay) => pay !== id);
      user.save();
      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
