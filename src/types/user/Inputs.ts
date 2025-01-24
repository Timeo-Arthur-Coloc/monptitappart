import { Expose } from "class-transformer";
import { IsOptional, IsString, IsArray } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { FlatshareEntity } from "../../databases/mysql/flatshare.entity";

export class userToCreateInput {
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
  password_hash: UserEntity['password_hash'];

  @Expose()
  @IsString()
  @IsOptional()
  profilePicture: UserEntity['profilePicture'];

  @Expose()
  @IsArray()
  @IsOptional()
  flatshares: FlatshareEntity[];
}