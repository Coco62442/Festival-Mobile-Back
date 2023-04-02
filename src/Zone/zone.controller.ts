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
import { Zone } from 'src/Schema/Zone.schema';
import { ZoneDTO } from './DTO/zone.dto';
import { ZoneUpdateDTO } from './DTO/zone.update.dto';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  getAllZones(): Promise<Zone[]> {
    return this.zoneService.getAllZones().catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getZoneById(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.getZoneById(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('zonesByFestival/:id')
  getZonesByFestivals(@Param('id') id: string): Promise<Zone[]> {
    return this.zoneService.getZonesByFestival(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createZone(@Body() newZone: ZoneDTO): Promise<Zone> {
    return this.zoneService.createZone(newZone).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteZone(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.deleteZone(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete('zonesByFestival/:id')
  deleteZonesByFestival(@Param('id') id: string): Promise<boolean> {
    return this.zoneService.deleteZonesByFestival(id).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Patch(':id')
  updateZone(
    @Param('id') id: string,
    @Body() zone: ZoneUpdateDTO,
  ): Promise<Zone> {
    return this.zoneService.updateZone(id, zone).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }
}
