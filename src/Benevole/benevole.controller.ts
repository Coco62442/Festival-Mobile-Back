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
  getAllBenevole(): Promise<BenevoleReturn[]> {
    return this.benevoleService.getAllBenevole();
  }

  @Get(':id')
  getBenevoleById(@Param('id') id: string): Promise<BenevoleReturn> {
    return this.benevoleService.getBenevoleById(id);
  }

  @Post()
  createBenevole(@Body() newBenevole: BenevoleCreateDTO): Promise<BenevoleReturn> {
    return this.benevoleService.createBenevole(newBenevole);
  }

  @Delete(':id')
  deleteBenevole(@Param('id') id: string): Promise<BenevoleReturn> {
    return this.benevoleService.deleteBenevole(id);
  }

  @Patch(':id')
  updateBenevole(
    @Param('id') id: string,
    @Body() benevole: BenevoleUpdateDTO,
  ): Promise<BenevoleReturn> {
    return this.benevoleService.updateBenevole(id, benevole);
  }
}
