import { IsNotEmpty, IsString } from 'class-validator';

export class UserValidator {
  @IsString()
  @IsNotEmpty()
  name: string;
}
