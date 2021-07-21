import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cNumber: string;

    @Column()
    cHolder: string;

    @Column()
    cExpire: string;

    @Column()
    cCVV:string;

    @Column()
    cType:number;
    
}