import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'app/user/dto/createUser.dto';
import { UserService } from 'app/user/user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
}
