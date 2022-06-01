import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelEntity, ModelSchema } from './entities/model.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelEntity.name, schema: ModelSchema },
    ]),
  ],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
