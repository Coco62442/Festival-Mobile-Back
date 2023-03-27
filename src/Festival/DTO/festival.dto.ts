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

  @IsArray()
  @IsOptional()
  idBenevoles: string[];

  @IsBoolean()
  @IsOptional()
  isClosed: boolean;
}
