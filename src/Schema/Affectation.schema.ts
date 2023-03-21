import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Creneau } from './Creneau.schema';
import { Zone } from './Zone.schema';

export type AffectationDocument = HydratedDocument<Affectation>;

@Schema({ collection: 'Affectation' })
export class Affectation {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Benevole' }],
    default: [],
  })
  idBenevoles: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creneau',
    required: true,
  })
  idCreneau: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' })
  idZone: string;
}

export const AffectationSchema = SchemaFactory.createForClass(Affectation);
