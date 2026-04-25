import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id!: number;
}
