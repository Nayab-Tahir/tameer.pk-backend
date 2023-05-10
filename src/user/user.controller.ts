import { JwtAuthGuard } from './../auth/guards/jwt.auth.guard';
import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('/create')
  async create(
    @Body() userData: CreateUserDto,
  ): Promise<UserDocument> | undefined {
    return this.UserService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(): Promise<UserDocument[]> | undefined {
    return this.UserService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOneById(
    @Param('id') id: Types.ObjectId,
  ): Promise<UserDocument> | undefined {
    return this.UserService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Body() userData: Partial<CreateUserDto>,
    @Param('id') id: Types.ObjectId,
  ): Promise<UserDocument> | undefined {
    return this.UserService.update(userData, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.UserService.delete(id);
  }
}
