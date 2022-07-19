import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
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
}
