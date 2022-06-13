import { IsNotEmpty } from 'class-validator';

export class AvisDto {
  @IsNotEmpty()
  commantaire: string;

  @IsNotEmpty()
  tomeId: number;

  userId: number;
}
