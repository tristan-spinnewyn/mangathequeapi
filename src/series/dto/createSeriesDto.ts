import { IsNotEmpty } from 'class-validator';

export class CreateSeriesDto {
  @IsNotEmpty()
  nameSeries: string;

  @IsNotEmpty()
  auteurId: number;
}
