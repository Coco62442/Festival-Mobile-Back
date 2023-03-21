import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffectationController } from './affectation.controller';
import { AffectationService } from './affectation.service';
import { AffectationSchema } from '../Schema/Affectation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Affectation', schema: AffectationSchema },
    ]),
  ],
  controllers: [AffectationController],
  providers: [AffectationService],
})
export class AffectationModule {}
