import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class JourDTO {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  @IsNotEmpty()
  debutHeure: Date;

  @IsDateString()
  @IsNotEmpty()
  finHeure: Date;

  @IsArray()
  @IsOptional()
  idCreneaux: string[];
}
