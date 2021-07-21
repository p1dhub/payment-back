import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentService {

    constructor(@InjectRepository(PaymentEntity) private usersRepository: Repository<PaymentEntity>) { }

    async checkPayment(getCard: string) {
        const salt = bcrypt.genSalt();
        const payments = (this.usersRepository.find());
        let isMatch = false;
        let hash;
        for (let index = 0; index < (await payments).length; index++) {
            hash = (await payments).pop().cNumber
            isMatch = await bcrypt.compare(getCard, hash);
            if (isMatch) break;
        }
        return isMatch;
        
    }

    async addPayment(getCard: Promise<PaymentEntity>) {
        if (this.checkPayment((await getCard).cNumber)) {
            const saltOrRounds = 4;
            const hNumber = await bcrypt.hash((await getCard).cNumber, saltOrRounds);
            const hCVV = await bcrypt.hash((await getCard).cCVV, saltOrRounds);
            const pmEntity = { 
                cNumber: hNumber,
                cHolder: (await getCard).cHolder,
                cExpire: (await getCard).cExpire,
                cCVV: hCVV,
                cType:(await getCard).cType
            };
            this.usersRepository.save(pmEntity);
            return 2; //success
        }
        else {
            return 3; //duplicate
        }
    }
}
