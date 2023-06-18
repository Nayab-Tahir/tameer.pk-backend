import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<User> | void> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'Username or password is incorrect!',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
