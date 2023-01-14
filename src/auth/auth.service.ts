import { Payload } from './../../dist/auth/types/general.d';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<UserDocument> | null> {
    const user = await this.UserService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload: Payload = {
      name: user.name,
      username: user.username,
      sub: user._id,
      email: user.email,
      phone: user.phone,
      ...(user.address && {
        address: {
          ...user.address,
        },
      }),
    };
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
