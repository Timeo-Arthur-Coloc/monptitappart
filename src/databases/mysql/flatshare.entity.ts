import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("flatshares")
export class FlatshareEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surface: number;

    @Column()
    bedrooms: number;

    @Column({ length: 50 })
    agency: string;

    @ManyToMany(() => UserEntity, user => user.flatshares)
    @JoinTable()
    roommates: UserEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    chief: UserEntity;

    @Column({ default: true })
    isActive: boolean;
}