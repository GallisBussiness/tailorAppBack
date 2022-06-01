import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsMongoId()
  id: string;
}
