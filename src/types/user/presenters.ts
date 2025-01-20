import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

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
  isActive: boolean;
}