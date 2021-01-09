import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../entity/user.entity';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { DeleteResult } from 'typeorm';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {

  constructor(private profileService: ProfileService) {
  }

  @Get(':uuid')
  getProfile(@Param('uuid') userID): Promise<User> {
    return this.profileService.getProfileByID(userID);
  }

  @Get(':uuid/token')
  getCheckToken(@Param('uuid') userID): Promise<User> {
    return this.profileService.getCheckToken(userID);
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid') userID): Promise<DeleteResult> {
    return this.profileService.deleteUsers(userID);
  }

  @Get('avatar/:avatar')
  getFileImage(@Param('avatar') avatar, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + avatar)));
  }
}
