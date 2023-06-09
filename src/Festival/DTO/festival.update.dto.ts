import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
  IsPositive,
  IsObject,
  IsArray,
  IsOptional,
  IsInt,
} from 'class-validator';

export class FestivalUpdateDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsNotEmpty()
  annee: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  nbrJours: number;

  @IsOptional()
  @IsArray()
  idBenevoles: string[];

  @IsOptional()
  @IsBoolean()
  @IsOptional()
  isClosed: boolean;
}
