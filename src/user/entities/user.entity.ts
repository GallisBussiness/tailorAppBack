import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String })
  prenom: string;

  @Prop({ type: String })
  nom: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  tel: string;

  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
