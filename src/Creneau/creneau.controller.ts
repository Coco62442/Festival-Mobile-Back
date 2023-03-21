import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreneauDTO } from './DTO/creneau.dto';
import { CreneauUpdateDTO } from './DTO/creneau.update.dto';
import { CreneauService } from './creneau.service';

@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Get()
  async getAllCreneaux(): Promise<CreneauDTO[]> {
    return this.creneauService.getAllCreneaux();
  }

  @Get(':id')
  async getCreneauById(@Param('id') id: string): Promise<CreneauDTO> {
    return this.creneauService.getCreneauById(id);
  }

  @Post()
  async createCreneau(@Body() newCreneau: CreneauDTO): Promise<CreneauDTO> {
    return this.creneauService.createCreneau(newCreneau);
  }

  @Delete(':id')
  async deleteCreneau(@Param('id') id: string) {
    this.creneauService.deleteCreneau(id);
  }

  @Patch(':id')
  async updateCreneau(
    @Param('id') id: string,
    @Body() creneau: CreneauUpdateDTO,
  ): Promise<CreneauDTO> {
    return this.creneauService.updateCreneau(id, creneau);
  }
}
