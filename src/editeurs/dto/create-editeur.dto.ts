import { IsNotEmpty } from 'class-validator';

export class CreateEditeurDto {
  @IsNotEmpty()
  nameEditeur: string;
}
