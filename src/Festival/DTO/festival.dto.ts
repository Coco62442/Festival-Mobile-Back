import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
  IsArray,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class FestivalDTO {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsDateString()
  @IsNotEmpty()
  annee: Date;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  nbrJours: number;

  @IsNotEmpty()
  @IsArray()
  idZones: string[];

  @IsNotEmpty()
  @IsArray()
  idJours: string[];

  @IsBoolean()
  @IsOptional()
  isClosed: boolean;
}
