import { Repository } from "typeorm";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { FlatshareEntity } from "../databases/mysql/flatshare.entity";
import { FlatshareToCreateInput } from "../types/flatshare/inputs";

export class FlatshareRepository {
  private flatshareDB: Repository<FlatshareEntity>;

  constructor() {
    this.flatshareDB = connectMySQLDB.getRepository(FlatshareEntity);
  }

  create(flatshare: FlatshareToCreateInput): FlatshareEntity {
    const newFlatshare = this.flatshareDB.create(flatshare);
    return newFlatshare
  }

  async save(flatshare: FlatshareEntity): Promise<FlatshareEntity> {
    return this.flatshareDB.save(flatshare);
  }

  //   findByLocation(email: string): Promise<FlatshareEntity | null> {
  //     return this.flatshareDB.findOne({ where: { email } });
  //   }

  findById(id: number): Promise<FlatshareEntity | null> {
    return this.flatshareDB.findOne({ where: { id }, relations: ["chief", "roommates"] });
  }

  findAll(): Promise<FlatshareEntity[]> {
    return this.flatshareDB.find({ relations: ["chief"] });
  }

  async delete(id: number): Promise<void> {
    const flatshare = await this.findById(id);
    if (flatshare) {
      flatshare.isActive = false;
      await this.save(flatshare);
    }
  }
}