import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentService {

    constructor(@InjectRepository(PaymentEntity) private usersRepository: Repository<PaymentEntity>) { }

    async checkPayment(getpayment: string) {
        const salt = bcrypt.genSalt();
        const payments = (this.usersRepository.find());
        let isMatch = false;
        let hash;
        for (let index = 0; index < (await payments).length; index++) {
            hash = (await payments).pop().payment
            isMatch = await bcrypt.compare(getpayment, hash);
            if (isMatch) break;
        }
        return isMatch;

    }

    async addPayment(getpayment: string) {
        if (this.checkPayment(getpayment)) {
            const saltOrRounds = 4;
            const hash = await bcrypt.hash(getpayment, saltOrRounds);
            const payment = { payment: hash }
            this.usersRepository.save(payment);
            return 2; //success
        }
        else {
            return 3; //duplicate
        }
    }
}
