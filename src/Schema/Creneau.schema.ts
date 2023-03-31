import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreneauDocument = HydratedDocument<Creneau>;

@Schema({ collection: 'Creneau' })
export class Creneau {
  @Prop({ required: true })
  heureDebut: string;

  @Prop({ required: true })
  heureFin: string;

  @Prop({ required: true })
  idJour: string;
}

export const CreneauSchema = SchemaFactory.createForClass(Creneau);
