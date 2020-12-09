import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../entity/user.entity';
import { Observable, of } from 'rxjs';
import { join } from 'path';



@Controller('profile')
export class ProfilesController {

  constructor(private profileService: ProfileService) {
  }

  @Get(':uuid')
  getProfile(@Param('uuid') userID): Promise<User> {
    return this.profileService.getProfileByID(userID);
  }


  @Get('avatar/:avatar')
  getFileImage(@Param('avatar') avatar, @Res() res): Observable<Object> {
    debugger
    return of(res.sendFile(join(process.cwd(), 'uploads/' + avatar)));

  }

}
