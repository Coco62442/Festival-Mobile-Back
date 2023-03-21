import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JourController } from './jour.controller';
import { JourService } from './jour.service';
import { Jour, JourSchema } from '../Schema/Jour.schema';
import { CreneauModule } from 'src/Creneau/creneau.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jour.name, schema: JourSchema }]),
    CreneauModule,
  ],
  controllers: [JourController],
  providers: [JourService],
})
export class JourModule {}
