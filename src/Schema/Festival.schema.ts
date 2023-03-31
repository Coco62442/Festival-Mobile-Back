import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Benevole } from './Benevole.schema';

export type FestivalDocument = HydratedDocument<Festival>;

@Schema({ collection: 'Festival' })
export class Festival {
  @Prop({ required: true, unique: true })
  nom: string;

  @Prop({ required: true })
  annee: string;

  @Prop({ required: true })
  nbrJours: number;

  @Prop({ default: [] })
  idBenevoles: string[];

  @Prop({ default: false })
  isClosed: boolean;

  benevoles: Benevole[];
}

export const FestivalSchema = SchemaFactory.createForClass(Festival);
