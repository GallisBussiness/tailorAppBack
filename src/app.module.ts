import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { MesureModule } from './mesure/mesure.module';
import { ModelModule } from './model/model.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, ClientModule, MesureModule, ModelModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
