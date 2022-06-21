import { IsNotEmpty } from 'class-validator';

export class EditionDto {
  @IsNotEmpty()
  nameEdition: string;

  @IsNotEmpty()
  statut: string;

  @IsNotEmpty()
  editeurId: number;
  @IsNotEmpty()
  serieId: number;
}
