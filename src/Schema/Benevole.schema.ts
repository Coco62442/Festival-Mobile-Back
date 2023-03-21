import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BenevoleDocument = HydratedDocument<Benevole>;

@Schema({ collection: 'Benevole' })
export class Benevole {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const BenevoleSchema = SchemaFactory.createForClass(Benevole);
