import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;
}
