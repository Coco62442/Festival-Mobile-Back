import { IsNotEmpty, IsString, Min, IsInt } from 'class-validator';

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
}
