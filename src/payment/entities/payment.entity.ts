import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Number, required: true })
  solde: number;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  avance: number;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  reste: number;

  @Prop({ type: Types.ObjectId, required: true, ref: Order.name })
  @Type(() => Order)
  order: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
