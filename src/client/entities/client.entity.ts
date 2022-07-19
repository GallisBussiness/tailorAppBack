import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true, versionKey: false })
export class Client {
  @Prop({ type: String, required: true })
  prenom: string;

  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: String, required: true, unique: true })
  tel: string;

  @Prop({ type: String, default: 'default_avatar.png' })
  avatar: string;

  @Prop({ type: String, required: true })
  adresse: string;

  @Prop({ type: Number, default: 0, min: 0 })
  lon: number;

  @Prop({ type: Number, default: 0, min: 0 })
  lar: number;

  @Prop({ type: Number, default: 0, min: 0 })
  cou: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
