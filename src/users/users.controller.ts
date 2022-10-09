import { Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param() param): Promise<User> {
    const user = this.usersService.getUser(param.userId);
    const data = await user;
    if (!data) {
      const createdUser = this.usersService.createUser({ id: param.userId });
      return createdUser;
    }
    return user;
  }
}
