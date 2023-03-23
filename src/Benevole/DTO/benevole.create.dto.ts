import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class BenevoleCreateDTO {
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

  @IsString()
  @IsNotEmpty()
  // TODO : décommenter
  // @IsStrongPassword()
  password: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  readonly isAdmin: boolean;
}
