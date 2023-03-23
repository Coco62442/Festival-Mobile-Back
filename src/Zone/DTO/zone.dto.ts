import { IsNotEmpty, IsString, Min, IsInt, IsMongoId } from 'class-validator';

export class ZoneDTO {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  nbBenevolesNecessaires: number;

  @IsInt()
  @Min(0)
  nbBenevolesActuels: number;

  @IsNotEmpty()
  @IsMongoId()
  idFestival: string;
}
