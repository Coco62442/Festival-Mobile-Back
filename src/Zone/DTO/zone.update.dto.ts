import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

export class ZoneUpdateDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  nbBenevolesNecessaires: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  nbBenevolesActuels: number;
}
