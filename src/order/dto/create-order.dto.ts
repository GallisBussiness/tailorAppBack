import { IsMongoId, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  date_de_livraison: string;

  @IsMongoId()
  client: string;

  @IsMongoId()
  model: string;
}
