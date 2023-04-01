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
import { FestivalService } from './festival.service';
import { FestivalDTO } from './DTO/festival.dto';
import { Festival } from 'src/Schema/Festival.schema';
import { FestivalUpdateDTO } from './DTO/festival.update.dto';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get()
  getAllFestival(): Promise<any[]> {
    return this.festivalService.getAllFestivals().catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getFestivalById(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.getFestivalById(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('getFestivalsByBenevole/:id')
  getFestivalsByBenevole(@Param('id') id: string): Promise<Festival[]> {
    return this.festivalService.getFestivalsByBenevole(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createFestival(@Body() newFestival: FestivalDTO): Promise<Festival> {
    return this.festivalService.createFestival(newFestival).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':idFestival/:idBenevole/addBenevole')
  addBenevoleToFestival(
    @Param('idFestival') idFestival: string,
    @Param('idBenevole') idBenevole: string,
  ): Promise<Festival> {
    return this.festivalService
      .addBenevoleToFestival(idFestival, idBenevole)
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Patch(':idFestival/:idBenevole/removeBenevole')
  removeBenevoleToFestival(
    @Param('idFestival') idFestival: string,
    @Param('idBenevole') idBenevole: string,
  ): Promise<Festival> {
    return this.festivalService
      .removeBenevoleToFestival(idFestival, idBenevole)
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Delete(':id')
  deleteFestival(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.deleteFestival(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':id')
  updateFestival(
    @Param('id') id: string,
    @Body() festival: FestivalUpdateDTO,
  ): Promise<Festival> {
    return this.festivalService.updateFestival(id, festival).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':id/close')
  changeStateFestival(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.changeStateFestival(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }
}
