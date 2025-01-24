import { IsOptional } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { FlatshareEntity } from "./flatshare.entity";
import { ExpensesEntity } from "./expenses.entity";
import { OwingsEntity } from "./owings.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string; // grosse faille de sécurité -> à ne pas faire en prod -> A mettre dans une autre table avec une relation

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  @IsOptional()
  profilePicture: string;

  @ManyToMany(() => FlatshareEntity, flatshare => flatshare.roommates)
  @JoinTable()
  flatshares: FlatshareEntity[];

  @OneToMany(() => FlatshareEntity, (flatshare) => flatshare.chief)
  isChiefOf: FlatshareEntity[];

  @ManyToMany(() => ExpensesEntity, (expense) => expense.payedBy)
  expenses: ExpensesEntity[];

  @OneToMany(() => OwingsEntity, (owing) => owing.debtor)
  debts: OwingsEntity[];
}
