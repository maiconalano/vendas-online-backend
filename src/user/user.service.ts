import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interface/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRpository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRouds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRouds);

    return this.userRpository.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRpository.find();
  }
}
