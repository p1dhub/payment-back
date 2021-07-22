import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pmService:PaymentService){}

  @UseGuards(JwtAuthGuard)
  @Post('check')
  check(@Body() body){
    if(body.payment)
      return this.pmService.checkPayment(body.payment);
    else
      return false;
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  add(@Body() body){
    if(body)
      return this.pmService.addPayment(body);
    else
      return 1; //payment false
  }
}
