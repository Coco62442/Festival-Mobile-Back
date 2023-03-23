import {
  Body,
  Controller,
  Delete,
  Get,
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
  getAllFestival(): Promise<Festival[]> {
    return this.festivalService.getAllFestivals();
  }

  @Get(':id')
  getFestivalById(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.getFestivalById(id);
  }

  @Post()
  createFestival(@Body() newFestival: FestivalDTO): Promise<Festival> {
    return this.festivalService.createFestival(newFestival);
  }

  @Patch(':idFestival/:idBenevole/addBenevole')
  addBenevoleToFestival(@Param('idFestival') idFestival: string, @Param('idBenevole') idBenevole: string): Promise<Festival> {
    return this.festivalService.addBenevoleToFestival(idFestival, idBenevole);
  }
  
  @Patch(':idFestival/:idBenevole/removeBenevole')
  removeBenevoleToFestival(@Param('idFestival') idFestival: string, @Param('idBenevole') idBenevole: string): Promise<Festival> {
    return this.festivalService.removeBenevoleToFestival(idFestival,idBenevole);
  }

  @Delete(':id')
  deleteFestival(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.deleteFestival(id);
  }

  @Patch(':id')
  updateFestival(
    @Param('id') id: string,
    @Body() festival: FestivalUpdateDTO,
  ): Promise<Festival> {
    return this.festivalService.updateFestival(id, festival);
  }

  @Patch(':id/close')
  changeStateFestival(@Param('id') id: string): Promise<Festival> {
    return this.festivalService.changeStateFestival(id);
  }
}
