import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { AffectationService } from './affectation.service';
  import { AffectationDTO } from './DTO/affectation.dto';
  import { Affectation } from 'src/Schema/Affectation.schema';
  import { AffectationUpdateDTO } from './DTO/affectation.update.dto';
  
  @Controller('affectation')
  export class AffectationController {
    constructor(private readonly affectationService: AffectationService) {}
  
    @Get()
    getAllAffectation(): Promise<Affectation[]> {
      return this.affectationService.getAllAffectations();
    }
  
    @Get(':id')
    getAffectationById(@Param('id') id: string): Promise<Affectation> {
      return this.affectationService.getAffectationById(id);
    }
  
    @Post()
    createAffectation(@Body() newAffectation: AffectationDTO): Promise<Affectation> {
      return this.affectationService.createAffectation(newAffectation);
    }

    @Patch(':idAffectation/:idBenevole/addBenevole')
    addBenevoleToAffectation(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<Affectation> {
      return this.affectationService.addBenevoleToAffectation(idAffectation, idBenevole);
    }

    @Patch(':idAffectation/:idBenevole/removeBenevole')
    removeBenevoleToAffectation(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<Affectation> {
      return this.affectationService.removeBenevoleToAffectation(idAffectation,idBenevole);
    }
  
    @Delete(':id')
    deleteAffectation(@Param('id') id: string): Promise<Affectation> {
      return this.affectationService.deleteAffectation(id);
    }
  
    @Patch(':id')
    updateAffectation(
      @Param('id') id: string,
      @Body() affectation: AffectationUpdateDTO,
    ): Promise<Affectation> {
      return this.affectationService.updateAffectation(id, affectation);
    }
  }
  