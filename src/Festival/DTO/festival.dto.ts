import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
  IsArray,
  IsOptional,
  IsInt,
} from 'class-validator';

export class FestivalDTO {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  annee: string;

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
