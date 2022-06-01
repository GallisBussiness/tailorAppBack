import { IsOptional, IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  nom: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsString()
  description: string;

  @IsString()
  nom_tissu: string;

  @IsOptional()
  @IsString()
  couleur_dominante: string;
}
