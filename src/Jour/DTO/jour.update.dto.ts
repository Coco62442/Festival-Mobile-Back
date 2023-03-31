import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class JourUpdateDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsNotEmpty()
  debutHeure: string;

  @IsOptional()
  @IsNotEmpty()
  finHeure: string;

  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  idFestival: string;
}
