import { UserService } from './user.service';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
}
