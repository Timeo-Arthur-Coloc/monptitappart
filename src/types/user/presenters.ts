import { Expose, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsArray } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { FlatshareEntity } from "../../databases/mysql/flatshare.entity";

export class UserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity['id'];

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
  @IsOptional()
  profilePicture: UserEntity['profilePicture'];

  @Expose()
  isActive: boolean;

  @Expose()
  @IsArray()
  @Type(() => FlatshareEntity)
  flatshares: FlatshareEntity[];
}