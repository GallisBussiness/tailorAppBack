import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModelDocument = ModelEntity & Document;

@Schema({ timestamps: true })
export class ModelEntity {
  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: String, default: 'default_avatar.png' })
  photo: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, required: true })
  nom_tissu: string;

  @Prop({ type: String })
  couleur_dominante: string;
}

export const ModelSchema = SchemaFactory.createForClass(ModelEntity);
