import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreneauUpdateDTO {
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  heureDebut: Date;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  heureFin: Date;
}
