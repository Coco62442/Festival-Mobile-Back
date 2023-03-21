import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class JourUpdateDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  debutHeure: Date;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  finHeure: Date;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  idCreneaux: string[];
}
