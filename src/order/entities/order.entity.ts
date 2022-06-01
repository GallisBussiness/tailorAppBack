import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { ModelEntity } from 'src/model/entities/model.entity';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: Date, required: true })
  date_livraison: string;

  @Prop({ type: Boolean, required: true })
  isComplete: boolean;

  @Prop({ type: Types.ObjectId, required: true, ref: Client.name })
  @Type(() => Client)
  client: Client;

  @Prop({ type: Types.ObjectId, required: true, ref: ModelEntity.name })
  @Type(() => ModelEntity)
  model: ModelEntity;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
