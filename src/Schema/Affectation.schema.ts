import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AffectationDocument = HydratedDocument<Affectation>;

@Schema({ collection: 'Affectation' })
export class Affectation {
  @Prop({ default: [] })
  idBenevoles: string[];

  @Prop({ required: true })
  idCreneau: string;

  @Prop()
  idZone: string;

  @Prop({ required: true })
  idFestival: string;
}

export const AffectationSchema = SchemaFactory.createForClass(Affectation);
