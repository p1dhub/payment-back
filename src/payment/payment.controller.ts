import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pmService:PaymentService){}

  @Post('check')
  check(@Body() body){
    if(body.payment)
      return this.pmService.checkPayment(body.payment);
    else
      return false;
  }

  @Post('add')
  add(@Body() body){
    if(body)
      return this.pmService.addPayment(body);
    else
      return 1; //payment false
  }
}
