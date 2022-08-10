import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.login(username);
    if (user !== null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      }
    }
    return null;
  }

  login(user) {
    const payload = {
      tel: user?.tel,
      id: user?._id,
      sub: user?._id,
    };
    return {
      token: this.jwtService.sign(payload),
      id: user?._id,
    };
  }
}
