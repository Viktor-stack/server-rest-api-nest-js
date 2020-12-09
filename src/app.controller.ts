import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { join } from 'path'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploads/:avatar')
  getFileImage(@Param('avatar') avatar, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + avatar)));

  }
}
