import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Country } from '../entity/country.entity';
import { CountryController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Country])],
  providers: [ProfileService, JwtStrategy],
  controllers: [ProfilesController, CountryController],
})
export class ProfilesModule {

}