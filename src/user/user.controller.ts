import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from './user.service';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('/create')
  async create(userData: CreateUserDto): Promise<UserDocument> | undefined {
    return await this.UserService.create(userData);
  }
}
