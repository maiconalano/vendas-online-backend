import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { ObjectUnsubscribedError } from 'rxjs';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
