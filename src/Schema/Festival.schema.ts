import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Jour, JourSchema } from './Jour.schema';
import { Zone, ZoneSchema } from './Zone.schema';

export type FestivalDocument = HydratedDocument<Festival>;

@Schema({ collection: 'Festival' })
export class Festival {
  @Prop({ required: true, unique: true })
  nom: string;

  @Prop({ required: true })
  annee: Date;

  @Prop({ required: true })
  nbrJours: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }],
    required: true,
  })
  idZones: string[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jour' }],
    required: true,
  })
  idJours: string[];

  @Prop({ default: false })
  isClosed: boolean;
}

export const FestivalSchema = SchemaFactory.createForClass(Festival);
