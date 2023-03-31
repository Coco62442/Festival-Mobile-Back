import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Creneau, CreneauSchema } from './Creneau.schema';

export type JourDocument = HydratedDocument<Jour>;

@Schema({ collection: 'Jour' })
export class Jour {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  debutHeure: string;

  @Prop({ required: true })
  finHeure: string;

  @Prop({ required: true })
  idFestival: string;
}

export const JourSchema = SchemaFactory.createForClass(Jour);
