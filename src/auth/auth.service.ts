import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types';
import { comparePasswords } from 'src/utilities/general';

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
    if (user && (await comparePasswords(pass, user.password))) {
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
      ...(Object.keys(user?.address ?? []).length > 0 && {
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
