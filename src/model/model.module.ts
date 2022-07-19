import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelEntity, ModelSchema } from './entities/model.entity';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/models');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1],
    );
  },
});

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelEntity.name, schema: ModelSchema },
    ]),
    UserModule,
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
