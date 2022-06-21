import { IsNotEmpty } from 'class-validator';

export class CreateAuteurDto {
  @IsNotEmpty()
  nameAuteur: string;
}
