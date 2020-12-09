import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { AdminService } from './admin..service';
import { RoleUserDto } from './dto/role-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {
  }

  @Get('users')
  getUsersAll() {
    return this.adminService.getUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id) {
    return this.adminService.getUserByID(id);
  }

  @Get('rolesList')
  getRolList() {
    return this.adminService.getRolList();
  }

  @Patch('/user/:id/edit')
  updateRole(@Param('id') id, @Body() role: RoleUserDto) {
    return this.adminService.updateRole(id, role);
  }
}
