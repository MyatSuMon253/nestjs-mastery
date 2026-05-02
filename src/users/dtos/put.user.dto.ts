import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';

export class PutUserDto extends PartialType(CreateUserDto) {}
