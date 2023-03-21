import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JourDTO } from './DTO/jour.dto';
import { JourUpdateDTO } from './DTO/jour.update.dto';
import { JourService } from './jour.service';

@Controller('jour')
export class JourController {
  constructor(private readonly jourService: JourService) {}

  @Get()
  async getAllJours(): Promise<JourDTO[]> {
    return this.jourService.getAllJours();
  }

  @Get(':id')
  async getJourById(@Param('id') id: string): Promise<JourDTO> {
    return this.jourService.getJourById(id);
  }

  @Post()
  async createJour(@Body() newJour: JourDTO): Promise<JourDTO> {
    return this.jourService.createJour(newJour);
  }

  @Delete(':id')
  async deleteJour(@Param('id') id: string) {
    this.jourService.deleteJour(id);
  }

  @Patch(':id')
  async updateJour(
    @Param('id') id: string,
    @Body() jour: JourUpdateDTO,
  ): Promise<JourDTO> {
    return this.jourService.updateJour(id, jour);
  }
}
