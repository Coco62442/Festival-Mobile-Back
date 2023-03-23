import { IsNotEmpty, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class AffectationUpdateDTO {
  @IsArray()
  @IsOptional()
  idBenevoles: string[];

  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  idCreneau: string;

  @IsMongoId()
  @IsOptional()
  idZone: string;

  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  idFestival: string;
}
