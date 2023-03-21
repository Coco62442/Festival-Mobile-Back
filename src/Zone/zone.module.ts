import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { ZoneSchema } from '../Schema/Zone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Zone', schema: ZoneSchema }])],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
