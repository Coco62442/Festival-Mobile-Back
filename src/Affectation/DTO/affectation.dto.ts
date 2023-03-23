import { IsNotEmpty, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class AffectationDTO {
  @IsArray()
  @IsOptional()
  idBenevoles: string[];

  @IsMongoId()
  @IsNotEmpty()
  idCreneau: string;

  @IsMongoId()
  @IsOptional()
  idZone: string;

  @IsMongoId()
  @IsNotEmpty()
  idFestival: string;
}
