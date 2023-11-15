import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserValidator } from './validators/user.validator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  createUser(@Body() user: UserValidator) {
    const { name } = user;
    return this.userService.createUserName(name);
  }

  @Get('')
  getUsers() {
    return this.userService.getUserName();
  }
}
