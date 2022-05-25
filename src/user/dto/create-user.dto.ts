import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  tel: string;

  @IsString()
  password: string;
}
