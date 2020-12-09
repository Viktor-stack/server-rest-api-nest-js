import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [ProfileService, JwtStrategy],
  controllers: [ProfilesController],
})
export class ProfilesModule {

}