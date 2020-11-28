export class AuthUserDto {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly token: string;
  readonly avatarSrc: string;
  readonly roles: string;
}