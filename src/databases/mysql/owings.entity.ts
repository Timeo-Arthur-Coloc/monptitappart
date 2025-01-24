import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ExpensesEntity } from "./expenses.entity";

@Entity("owings")
export class OwingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: 'date' })
    date: string;

    @ManyToOne(() => UserEntity)
    @JoinTable()
    debtor: UserEntity;

    @ManyToOne(() => ExpensesEntity)
    @JoinTable()
    expense: ExpensesEntity;
}