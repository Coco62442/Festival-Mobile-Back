import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';
import { FestivalSchema } from '../Schema/Festival.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Festival', schema: FestivalSchema }]),
  ],
  controllers: [FestivalController],
  providers: [FestivalService],
})
export class FestivalModule {}
