import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstName!: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()\[\]{}|\\/+\-_.:;=,~])[^\s]{8,}$/,
    {
      message:
        'Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character for password',
    },
  )
  password!: string;
}
