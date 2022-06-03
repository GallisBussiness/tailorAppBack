import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';

export type MesureDocument = Mesure & Document;

@Schema({ timestamps: true, versionKey: false })
export class Mesure {
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  lon: number;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  lar: number;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  cou: number;

  @Prop({ type: Types.ObjectId, unique: true, ref: Client.name })
  @Type(() => Client)
  client: Client;
}

export const MesureSchema = SchemaFactory.createForClass(Mesure);
