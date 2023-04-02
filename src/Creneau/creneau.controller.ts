import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
    return this.creneauService.getAllCreneaux().catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getCreneauById(@Param('id') id: string): Promise<Creneau> {
    return this.creneauService.getCreneauById(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createCreneau(@Body() newCreneau: CreneauDTO): Promise<Creneau> {
    return this.creneauService.createCreneau(newCreneau).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteCreneau(@Param('id') id: string): Promise<Creneau> {
    return this.creneauService.deleteCreneau(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete('creneauxByJour/:id')
  deleteCreneauxByJour(@Param('id') id: string): Promise<boolean> {
    return this.creneauService.deleteCreneauxByJour(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':id')
  updateCreneau(
    @Param('id') id: string,
    @Body() creneau: CreneauUpdateDTO,
  ): Promise<Creneau> {
    return this.creneauService.updateCreneau(id, creneau).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }
}
