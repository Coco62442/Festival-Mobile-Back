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
import { JourService } from './jour.service';
import { JourDTO } from './DTO/jour.dto';
import { Jour } from 'src/Schema/Jour.schema';
import { JourUpdateDTO } from './DTO/jour.update.dto';

@Controller('jour')
export class JourController {
  constructor(private readonly jourService: JourService) {}

  @Get()
  getAllJour(): Promise<Jour[]> {
    return this.jourService.getAllJours().catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getJourById(@Param('id') id: string): Promise<Jour> {
    return this.jourService.getJourById(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createJour(@Body() newJour: JourDTO): Promise<Jour> {
    return this.jourService.createJour(newJour).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteJour(@Param('id') id: string): Promise<Jour> {
    return this.jourService.deleteJour(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':id')
  updateJour(
    @Param('id') id: string,
    @Body() jour: JourUpdateDTO,
  ): Promise<Jour> {
    return this.jourService.updateJour(id, jour).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }
}
