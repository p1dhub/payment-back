import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findOne(username);
    
    if (user && user.pop().password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Promise<UserEntity>) {
    const userTemp: any = await this.usersService.findOne((await user).username);
    const payload = { username: (await user).username, sub: (await user).userId };
    return {
      access_token: this.jwtService.sign(payload),
      user_id:userTemp[0].userId
    };
  }
}
