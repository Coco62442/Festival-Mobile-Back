import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleController } from './benevole.controller';
import { BenevoleService } from './benevole.service';
import { BenevoleSchema } from '../Schema/Benevole.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Benevole', schema: BenevoleSchema }]),
  ],
  controllers: [BenevoleController],
  providers: [BenevoleService],
  exports: [BenevoleService],
})
export class BenevoleModule {}
