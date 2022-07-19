import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ModelModule } from './model/model.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ClientModule,
    ModelModule,
    OrderModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
