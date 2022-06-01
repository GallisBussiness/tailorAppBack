import { Module } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { MesureController } from './mesure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mesure, MesureSchema } from './entities/mesure.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mesure.name, schema: MesureSchema }]),
  ],
  controllers: [MesureController],
  providers: [MesureService],
})
export class MesureModule {}
