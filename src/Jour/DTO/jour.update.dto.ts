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
  @IsMongoId()
  @IsNotEmpty()
  idFestival: string;
}
