import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true, versionKey: false })
export class Client {
  @Prop({ type: String })
  prenom: string;

  @Prop({ type: String })
  nom: string;

  @Prop({ type: String })
  tel: string;

  @Prop({ type: String })
  avatar: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
