import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-users.dto";

export class PutUserDto extends PartialType(CreateUserDto) {

}