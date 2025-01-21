import { Expose } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { IsOptional, IsString } from "class-validator";

export class UserToCreateDTO {
  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: UserEntity['lastname'];

  @Expose()
  @IsString()
  birthdate: UserEntity['birthdate'];

  @Expose()
  @IsString()
  email: UserEntity['email'];

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsString()
  @IsOptional()
  profilePicture: string;
}