import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class JourDTO {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  debutHeure: string;

  @IsNotEmpty()
  finHeure: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  idFestival: string;
}
