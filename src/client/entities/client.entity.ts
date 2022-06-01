import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true, versionKey: false })
export class Client {
  @Prop({ type: String, required: true })
  prenom: string;

  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: String, required: true })
  tel: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String, required: true })
  adresse: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
