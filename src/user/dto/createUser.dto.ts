export class CreateUserDto {
  readonly email: string;
  readonly name: string;
  readonly surname: string;
  readonly secondName?: string;
  readonly password: string;
}
