import {
    IsNotEmpty,
    IsString,
    IsEmail,
  } from 'class-validator';
  
  export class BenevoleLoginDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    readonly password: string;
  }
  