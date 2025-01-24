import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { OwingsEntity } from "./owings.entity";

@Entity("expenses")
export class ExpensesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column({ length: 150 })
    details: string;

    @Column()
    amout: number;

    @Column({ type: 'date' })
    date: string;

    @ManyToOne(() => UserEntity)
    @JoinTable()
    payedBy: UserEntity;

    @OneToMany(() => OwingsEntity, (owing) => owing.expense)
    owings: OwingsEntity[];
}