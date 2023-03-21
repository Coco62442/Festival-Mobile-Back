import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FestivalDTO } from './DTO/festival.dto';
import { FestivalUpdateDTO } from './DTO/festival.update.dto';
import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get()
  async getAllFestivals(): Promise<FestivalDTO[]> {
    return this.festivalService.getAllFestivals();
  }

  @Get(':id')
  async getFestivalById(@Param('id') id: string): Promise<FestivalDTO> {
    return this.festivalService.getFestivalById(id);
  }

  @Post()
  async createFestival(@Body() newFestival: FestivalDTO): Promise<FestivalDTO> {
    return this.festivalService.createFestival(newFestival);
  }

  @Delete(':id')
  async deleteFestival(@Param('id') id: string) {
    this.festivalService.deleteFestival(id);
  }

  @Patch(':id')
  async updateFestival(
    @Param('id') id: string,
    @Body() festival: FestivalUpdateDTO,
  ): Promise<FestivalDTO> {
    return this.festivalService.updateFestival(id, festival);
  }
}
