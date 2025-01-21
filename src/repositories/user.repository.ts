import { Repository } from "typeorm";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserEntity } from "../databases/mysql/user.entity";
import { userToCreateInput } from "../types/user/inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = this.userDB.create(user);
    return newUser
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: { email } });
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userDB.delete(id);
  }
}