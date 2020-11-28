import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '../entity/user.entity';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    return await this.authService.login(body, res);
  }

  @Post('register')
  async register(@Body() authUserDto: AuthUserDto): Promise<{ message: string } | User> {
    return await this.authService.register(authUserDto);
  }

  @Patch('update/:id')
  updateToken(@Param('id') id, @Body('token') token: string) {
    return this.authService.updateToken(token, id);
  }

  @Patch('user/:id/edit')
  updateRole(@Param('id') id, @Body() userDto) {
    return this.authService.updateRole(userDto.id, id);
  }


  @Get('users')
  async getUserAll() {
    return await this.authService.getAllUser();
  }

  @Get('user/:id')
  getByIdUser(@Param('id') id) {
    return this.authService.getByIdUser(id);
  }
}
