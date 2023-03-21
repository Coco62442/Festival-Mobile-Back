import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AffectationDTO } from './DTO/affectation.dto';
import { AffectationUpdateDTO } from './DTO/affectation.update.dto';
import { AffectationService } from './affectation.service';
import { Affectation } from 'src/Schema/Affectation.schema';

@Controller('affectation')
export class AffectationController {
  constructor(private readonly affectationService: AffectationService) {}

  @Get()
  async getAllAffectations(): Promise<Affectation[]> {
    return this.affectationService.getAllAffectations();
  }

  @Get(':id')
  async getAffectationById(@Param('id') id: string): Promise<Affectation> {
    return this.affectationService.getAffectationById(id);
  }

  @Post()
  async createAffectation(
    @Body() newAffectation: AffectationDTO,
  ): Promise<Affectation> {
    return this.affectationService.createAffectation(newAffectation);
  }

  @Delete(':id')
  async deleteAffectation(@Param('id') id: string) {
    this.affectationService.deleteAffectation(id);
  }

  @Patch(':id')
  async updateAffectation(
    @Param('id') id: string,
    @Body() affectation: AffectationUpdateDTO,
  ): Promise<Affectation> {
    return this.affectationService.updateAffectation(id, affectation);
  }
}
