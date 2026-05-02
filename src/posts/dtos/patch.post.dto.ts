import { CreatePostDto } from './create.post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Id of the post you want to update',
  })
  @IsInt()
  @IsNotEmpty()
  id!: number;
}
