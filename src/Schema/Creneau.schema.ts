import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreneauDocument = HydratedDocument<Creneau>;

@Schema({ collection: 'Creneau' })
export class Creneau {
  @Prop({ required: true })
  heureDebut: Date;

  @Prop({ required: true })
  heureFin: Date;
}

export const CreneauSchema = SchemaFactory.createForClass(Creneau);
