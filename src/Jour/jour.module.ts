import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JourController } from './jour.controller';
import { JourService } from './jour.service';
import { Jour, JourSchema } from '../Schema/Jour.schema';
import { FestivalModule } from 'src/Festival/festival.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jour.name, schema: JourSchema }]),
    FestivalModule,
  ],
  controllers: [JourController],
  providers: [JourService],
  exports: [JourService],
})
export class JourModule {}
