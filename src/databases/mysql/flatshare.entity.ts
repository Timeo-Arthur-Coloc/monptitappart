import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    agency: string

    @ManyToOne(() => UserEntity, (user) => user.flatshares)
    roomates: UserEntity[];

    @OneToOne(() => UserEntity, (user) => user.isChiefOf)
    chief: UserEntity;
}