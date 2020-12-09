import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { RoleUserDto } from './dto/role-user.dto';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(User) private userRepos: Repository<User>,
              @InjectRepository(Role) private roleRepos: Repository<Role>) {
  }

  async getUsers() {
    return await this.userRepos.find({ relations: ['roleID'] });
  }

  async getUserByID(id: string) {
    return await this.userRepos.findOne(id, { relations: ['roleID'] });
  }

  async getRolList() {
    return await this.roleRepos.find();
  }

  async updateRole(id: string, role: RoleUserDto) {
    const user = await this.userRepos.findOne(id, { relations: ['roleID'] });
    debugger
    user.roleID = await this.roleRepos.findOne(role.roleID);
    return this.userRepos.save(user);
  }

}