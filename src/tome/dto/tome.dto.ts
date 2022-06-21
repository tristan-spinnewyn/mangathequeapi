import { IsNotEmpty } from 'class-validator';

export class TomeDto {
  @IsNotEmpty()
  numero: number;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  nbpage: number;

  @IsNotEmpty()
  dateSortie: Date;

  @IsNotEmpty()
  imageCouverture: string;

  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  editionId: number;
}
