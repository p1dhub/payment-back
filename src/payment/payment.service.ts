import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentService {

    constructor(@InjectRepository(PaymentEntity) private usersRepository: Repository<PaymentEntity>) { }

    async getAll(): Promise<PaymentEntity[]> {
        return await this.usersRepository.find();
    }

    async getPayment(_id: number): Promise<PaymentEntity[]> {
        console.log("id:", typeof (_id));

        return await this.usersRepository.find({
            select: ["payment"],
            where: [{ "id": _id }]
        });
    }

    async addPayment(payment: PaymentEntity) {
        return await this.usersRepository.save(payment);
    }
}
