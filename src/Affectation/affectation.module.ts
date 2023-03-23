import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffectationController } from './affectation.controller';
import { AffectationService } from './affectation.service';
import { AffectationSchema } from '../Schema/Affectation.schema';
import { BenevoleModule } from 'src/Benevole/benevole.module';
import { ZoneModule } from 'src/Zone/zone.module';
import { CreneauModule } from 'src/Creneau/creneau.module';
import { FestivalModule } from 'src/Festival/festival.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Affectation', schema: AffectationSchema }]),
    BenevoleModule, ZoneModule, CreneauModule, FestivalModule
  ],
  controllers: [AffectationController],
  providers: [AffectationService],
})
export class AffectationModule {}
