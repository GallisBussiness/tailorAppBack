import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreateMesureDto } from './create-mesure.dto';

export class UpdateMesureDto extends PartialType(CreateMesureDto) {
  @IsMongoId()
  id: string;
}
