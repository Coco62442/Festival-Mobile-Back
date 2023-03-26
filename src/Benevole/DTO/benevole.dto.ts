import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class BenevoleDTO {
  @IsMongoId()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly nom: string;

  @IsString()
  @IsNotEmpty()
  readonly prenom: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isAdmin: boolean;
}
