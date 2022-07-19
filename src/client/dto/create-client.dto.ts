import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  tel: string;

  @IsString()
  adresse: string;

  @IsOptional()
  @IsNumber()
  lon: number;

  @IsOptional()
  @IsNumber()
  lar: number;

  @IsOptional()
  @IsNumber()
  cou: number;

  @IsOptional()
  @IsString()
  avatar: string;
}
