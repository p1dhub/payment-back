import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pmService:PaymentService){}

  @Get()
  getAll(){
    return this.pmService.getAll();
  }

  @Get(':id')
  getByID(@Param() params){
    console.log(params);
    
    return this.pmService.getPayment(params.id);
  }

  @Post('add')
  async add(@Body() body){
    await this.pmService.addPayment(body);
    return await "OK";
  }
}
