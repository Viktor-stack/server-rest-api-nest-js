import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { AdminService } from './admin..service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [AdminService, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {
}