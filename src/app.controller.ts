import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserEntity } from './users/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private service: UsersService) { }

  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }
  
  @Post('register')
  async insert(@Body() body:UserEntity) {
    return this.service.insert(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getA(@Param() params) {
    return this.service.getAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('clogin')
  cLogin(){
    return true
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('user/del/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
  
}
