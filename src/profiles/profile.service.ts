import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { Country } from '../entity/country.entity';
import { Response } from 'express';
import { unlink } from 'fs';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private userRepos: Repository<User>,
              @InjectRepository(Role) private roleRepos: Repository<Role>,
              @InjectRepository(Country) private countryRepos: Repository<Country>) {
  }

  async getProfileByID(userID: string) {
    return await this.userRepos.findOne(userID, {
      relations: ['roleID', 'countryID'],
      select: [
        'avatarName',
        '_id',
        'addressLine1',
        'token',
        'city',
        'countryID',
        'firstName',
        'lastName',
        'postalCode',
        'addressLine2',
        'companyName',
        'userPrice',
        'createDate',
        'region',
      ],
    });
  }

  async getCheckToken(userID: string) {
    return await this.userRepos.findOne(userID, {
      relations: ['roleID'],
      select: [
        'firstName',
        'avatarName',
        'token',
      ],
    })
  }


  async getAllCountry(@Res() res: Response) {
    const country = await this.countryRepos.find();
    return res.status(200).json(country);
  }

  async deleteUsers(userID: string) {
    debugger
    let file: string;
    const user = await this.userRepos.findOne(userID);
    file = user.avatarName;
    unlink(file, (err) => {
      if (err) throw err;
      console.log('file delete');
    });
    return await this.userRepos.delete(userID);
  }

}