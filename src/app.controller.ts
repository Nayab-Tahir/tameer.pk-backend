import { UserDocument } from './user/schema/user.schema';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local.auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private AuthService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request) {
    return this.AuthService.login(request.user as UserDocument);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return 'HELLO WORLD';
  }
}
