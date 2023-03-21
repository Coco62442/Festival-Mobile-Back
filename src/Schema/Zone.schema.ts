import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ZoneDocument = HydratedDocument<Zone>;

@Schema({ collection: 'Zone' })
export class Zone {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  nbBenevolesNecessaires: number;

  @Prop()
  nbBenevolesActuels: number;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
