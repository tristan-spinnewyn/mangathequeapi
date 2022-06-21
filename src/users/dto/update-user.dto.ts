import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  password: string;

  @IsNotEmpty()
  pseudonyme: string;

  @IsNotEmpty()
  currentPassword: string;

  active: boolean;

  isAdmin: boolean;

  changePassword: boolean;
}
