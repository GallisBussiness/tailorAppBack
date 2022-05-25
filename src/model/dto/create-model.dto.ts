import { IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  nom: string;

  @IsString()
  photo: string;

  @IsString()
  description: string;

  @IsString()
  nom_tissu: string;
}
