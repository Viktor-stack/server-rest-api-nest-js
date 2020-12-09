import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './ jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    return await this.authService.login(body, res);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatarName', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        let date: string = new Date().toISOString();
        let dateArr = date.split(':');
        date = dateArr.join('-');
        cb(null, `${date}-${file.originalname}`);
      },
    }),
  }))
  async register(@Body() authUserDto: AuthUserDto, @Res() res: Response, @UploadedFile() file): Promise<Response<any>> {
    return await this.authService.register(authUserDto, res, file);
  }

  @Patch('update/:id')
  updateToken(@Param('id') id, @Body('token') token: string) {
    return this.authService.updateToken(token, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id/edit')
  updateRole(@Param('id') id, @Body() userDto) {
    return this.authService.updateRole(userDto.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id/update')
  updateUser(@Param('id') id, @Body() userDto: AuthUserDto, @Res() res: Response) {
    return this.authService.updateUser(id, userDto, res);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUserAll(@Res() res: Response) {
    return await this.authService.getAllUser(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getByIdUser(@Param('id') id) {
    return this.authService.getByIdUser(id);
  }


  @Get('profile')
  getProfile(@Res() res: Response) {
    return this.authService.getAllUser(res);
  }
}
