import {
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreneauUpdateDTO {
  @IsOptional()
  @IsNotEmpty()
  heureDebut: string;

  @IsOptional()
  @IsNotEmpty()
  heureFin: string;

  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  idJour: string;
}
