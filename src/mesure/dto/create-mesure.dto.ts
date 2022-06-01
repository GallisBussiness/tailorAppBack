import { IsMongoId, IsNumber } from 'class-validator';

export class CreateMesureDto {
  @IsNumber()
  lon: number;

  @IsNumber()
  lar: number;

  @IsNumber()
  cou: number;

  @IsMongoId()
  client: string;
}
