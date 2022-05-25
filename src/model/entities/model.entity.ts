import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Model {
  @Prop({ type: String })
  nom: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  nom_tissu: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
