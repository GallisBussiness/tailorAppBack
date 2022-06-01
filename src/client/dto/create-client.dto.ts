import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  tel: string;

  @IsString()
  adresse: string;
}
