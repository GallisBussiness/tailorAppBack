import { Module } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { MesureController } from './mesure.controller';

@Module({
  controllers: [MesureController],
  providers: [MesureService]
})
export class MesureModule {}
