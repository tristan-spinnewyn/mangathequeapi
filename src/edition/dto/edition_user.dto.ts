import { IsNotEmpty } from 'class-validator';

export class Edition_userDto {
  @IsNotEmpty()
  note: number;
}
