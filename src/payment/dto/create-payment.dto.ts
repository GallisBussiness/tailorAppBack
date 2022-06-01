import { IsMongoId, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  solde: number;

  @IsNumber()
  avance: number;

  @IsNumber()
  reste: number;

  @IsMongoId()
  order: string;
}
