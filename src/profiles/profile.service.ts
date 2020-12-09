import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';


@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private userRepos: Repository<User>,
              @InjectRepository(Role) private roleRepos: Repository<Role>) {
  }

  async getProfileByID(userID: string) {
    return await this.userRepos.findOne(userID, { relations: ['roleID'] });
  }

}