import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { ModelEntity } from 'src/model/entities/model.entity';
import { Order } from 'src/order/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  prenom: string;

  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  tel: string;

  @Prop({ type: String, default: 'default_avatar.png' })
  avatar: string;

  @Prop({
    type: [
      { type: Types.ObjectId, required: true, default: [], ref: Client.name },
    ],
  })
  clients: string[];

  @Prop({
    type: [
      { type: Types.ObjectId, required: true, default: [], ref: Order.name },
    ],
  })
  orders: string[];

  @Prop({
    type: [
      { type: Types.ObjectId, required: true, default: [], ref: Payment.name },
    ],
  })
  payments: string[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        required: true,
        default: [],
        ref: ModelEntity.name,
      },
    ],
  })
  models: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
