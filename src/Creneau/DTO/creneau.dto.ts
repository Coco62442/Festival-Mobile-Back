import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';

export class CreneauDTO {
  @IsNotEmpty()
  heureDebut: string;

  @IsNotEmpty()
  heureFin: string;

  @IsNotEmpty()
  @IsMongoId()
  idJour: string;
}
