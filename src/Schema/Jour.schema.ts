import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Creneau, CreneauSchema } from './Creneau.schema';

export type JourDocument = HydratedDocument<Jour>;

@Schema({ collection: 'Jour' })
export class Jour {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  debutHeure: Date;

  @Prop({ required: true })
  finHeure: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creneau' }],
    default: [],
  })
  idCreneaux: string[];
}

export const JourSchema = SchemaFactory.createForClass(Jour);
