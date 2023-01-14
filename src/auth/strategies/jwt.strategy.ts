import { JWT_SECRET } from 'src/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Payload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: Payload) {
    return {
      _id: payload.sub,
      username: payload.username,
      name: payload.name,
      email: payload.email,
      ...(Object.keys(payload.address).length > 0 && {
        address: {
          ...payload.address,
        },
      }),
    };
  }
}
