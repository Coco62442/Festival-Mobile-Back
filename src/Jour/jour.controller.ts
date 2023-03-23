import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JourService } from './jour.service';
import { JourDTO } from './DTO/jour.dto';
import { Jour } from 'src/Schema/Jour.schema';
import { JourUpdateDTO } from './DTO/jour.update.dto';

@Controller('jour')
export class JourController {
  constructor(private readonly jourService: JourService) {}

  @Get()
  getAllJour(): Promise<Jour[]> {
    return this.jourService.getAllJours();
  }

  @Get(':id')
  getJourById(@Param('id') id: string): Promise<Jour> {
    return this.jourService.getJourById(id);
  }

  @Post()
  createJour(@Body() newJour: JourDTO): Promise<Jour> {
    return this.jourService.createJour(newJour);
  }

  @Delete(':id')
  deleteJour(@Param('id') id: string): Promise<Jour> {
    return this.jourService.deleteJour(id);
  }

  @Patch(':id')
  updateJour(
    @Param('id') id: string,
    @Body() jour: JourUpdateDTO,
  ): Promise<Jour> {
    return this.jourService.updateJour(id, jour);
  }
}
