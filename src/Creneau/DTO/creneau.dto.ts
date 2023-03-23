import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';

export class CreneauDTO {
  @IsDateString()
  @IsNotEmpty()
  heureDebut: Date;

  @IsDateString()
  @IsNotEmpty()
  heureFin: Date;

  @IsNotEmpty()
  @IsMongoId()
  idJour: string;
}
