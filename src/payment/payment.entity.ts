import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    payment: string;
}