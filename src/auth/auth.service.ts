import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private UserService: UserService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.UserService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
