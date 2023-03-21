import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreneauController } from './creneau.controller';
import { CreneauService } from './creneau.service';
import { CreneauSchema } from '../Schema/Creneau.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Creneau', schema: CreneauSchema }]),
  ],
  controllers: [CreneauController],
  providers: [CreneauService],
  exports: [CreneauService],
})
export class CreneauModule {}
