import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BenevoleService } from './benevole.service';
import { BenevoleCreateDTO } from './DTO/benevole.create.dto';
import { BenevoleUpdateDTO } from './DTO/benevole.update.dto';
import { BenevoleReturn } from './Interface/benevoleReturn.interface';

@Controller('benevole')
export class BenevoleController {
  constructor(private readonly benevoleService: BenevoleService) {}

  @Get()
  async getAllBenevoles(): Promise<BenevoleReturn[]> {
    return this.benevoleService.getAllBenevoles();
  }

  @Get(':id')
  async getBenevoleById(@Param('id') id: string): Promise<BenevoleReturn> {
    return this.benevoleService.getBenevoleById(id);
  }

  @Post()
  async createBenevole(
    @Body() newBenevole: BenevoleCreateDTO,
  ): Promise<BenevoleReturn> {
    return this.benevoleService.createBenevole(newBenevole);
  }

  @Delete(':id')
  async deleteBenevole(@Param('id') id: string) {
    this.benevoleService.deleteBenevole(id);
  }

  @Patch(':id')
  async updateBenevole(
    @Param('id') id: string,
    @Body() benevole: BenevoleUpdateDTO,
  ): Promise<BenevoleReturn> {
    return this.benevoleService.updateBenevole(id, benevole);
  }
}
