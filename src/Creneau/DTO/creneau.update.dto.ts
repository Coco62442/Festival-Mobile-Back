import { IsNotEmpty, IsDateString, IsOptional, IsMongoId } from 'class-validator';

export class CreneauUpdateDTO {
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  heureDebut: Date;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  heureFin: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  idJour: string;
}
