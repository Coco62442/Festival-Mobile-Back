import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreneauDTO {
  @IsDateString()
  @IsNotEmpty()
  heureDebut: Date;

  @IsDateString()
  @IsNotEmpty()
  heureFin: Date;
}
