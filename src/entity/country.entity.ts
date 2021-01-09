import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Country {

  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  countryName: string;

  @OneToMany(() => User, User => User.countryID)
  countryID: User[];
}