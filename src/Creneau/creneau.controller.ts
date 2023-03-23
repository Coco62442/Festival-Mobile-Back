import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { CreneauService } from './creneau.service';
  import { CreneauDTO } from './DTO/creneau.dto';
  import { Creneau } from 'src/Schema/Creneau.schema';
  import { CreneauUpdateDTO } from './DTO/creneau.update.dto';
  
  @Controller('creneau')
  export class CreneauController {
    constructor(private readonly creneauService: CreneauService) {}
  
    @Get()
    getAllCreneau(): Promise<Creneau[]> {
      return this.creneauService.getAllCreneaux();
    }
  
    @Get(':id')
    getCreneauById(@Param('id') id: string): Promise<Creneau> {
      return this.creneauService.getCreneauById(id);
    }
  
    @Post()
    createCreneau(@Body() newCreneau: CreneauDTO): Promise<Creneau> {
      return this.creneauService.createCreneau(newCreneau);
    }
  
    @Delete(':id')
    deleteCreneau(@Param('id') id: string): Promise<Creneau> {
      return this.creneauService.deleteCreneau(id);
    }
  
    @Patch(':id')
    updateCreneau(
      @Param('id') id: string,
      @Body() creneau: CreneauUpdateDTO,
    ): Promise<Creneau> {
      return this.creneauService.updateCreneau(id, creneau);
    }
  }
  