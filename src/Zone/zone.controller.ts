import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ZoneDTO } from './DTO/zone.dto';
import { ZoneUpdateDTO } from './DTO/zone.update.dto';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  async getAllZones(): Promise<ZoneDTO[]> {
    return this.zoneService.getAllZones();
  }

  @Get(':id')
  async getZoneById(@Param('id') id: string): Promise<ZoneDTO> {
    return this.zoneService.getZoneById(id);
  }

  @Post()
  async createZone(@Body() newZone: ZoneDTO): Promise<ZoneDTO> {
    return this.zoneService.createZone(newZone);
  }

  @Delete(':id')
  async deleteZone(@Param('id') id: string) {
    this.zoneService.deleteZone(id);
  }

  @Patch(':id')
  async updateZone(
    @Param('id') id: string,
    @Body() zone: ZoneUpdateDTO,
  ): Promise<ZoneDTO> {
    return this.zoneService.updateZone(id, zone);
  }
}
