import { Controller, Get, Res } from '@nestjs/common';
import { Country } from '../entity/country.entity';
import { ProfileService } from './profile.service';
import {Response} from 'express';

@Controller('country')
export class CountryController {

  constructor(private profileService: ProfileService) {
  }

  @Get()
  getAllCountry(@Res() res: Response): Promise<Response<Country>> {
    return this.profileService.getAllCountry(res);
  }
}