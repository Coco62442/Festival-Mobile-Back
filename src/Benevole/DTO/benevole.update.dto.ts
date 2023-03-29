import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class BenevoleUpdateDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly nom: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly prenom: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isAdmin: boolean;
}
