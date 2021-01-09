import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Country } from './country.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'User' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  companyName: string;

  @Column({ default: '' })
  addressLine1: string;

  @Column({ default: '' })
  addressLine2: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  region: string;

  @Column({ default: '' })
  postalCode: string;

  @Column({ default: null })
  token: string;

  @Column({ default: '' })
  avatarName: string;

  @Column({ default: 0 })
  userPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Role, role => role.roleID)
  roleID: Role;

  @ManyToOne(() => Country, cont => cont.countryID)
  countryID: Country;
}