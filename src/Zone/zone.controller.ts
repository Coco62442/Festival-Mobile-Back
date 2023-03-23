import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Zone } from 'src/Schema/Zone.schema';
import { ZoneDTO } from './DTO/zone.dto';
import { ZoneUpdateDTO } from './DTO/zone.update.dto';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  getAllZones(): Promise<Zone[]> {
    return this.zoneService.getAllZones();
  }

  @Get(':id')
  getZoneById(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.getZoneById(id);
  }

  @Post()
  createZone(@Body() newZone: ZoneDTO): Promise<Zone> {
    return this.zoneService.createZone(newZone);
  }

  @Delete(':id')
  deleteZone(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.deleteZone(id);
  }

  @Patch(':id')
  updateZone(
    @Param('id') id: string,
    @Body() zone: ZoneUpdateDTO,
  ): Promise<Zone> {
    return this.zoneService.updateZone(id, zone);
  }
}
