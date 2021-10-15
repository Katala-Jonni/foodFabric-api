import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  address: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  info: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsMobilePhone('ru-RU')
  phone: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  director: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(300)
  description: string;
}
