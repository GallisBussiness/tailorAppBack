import { IsDate, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsDate()
  date_de_livaison: Date;

  @IsString()
  client: string;

  @IsString()
  model: string;
}
