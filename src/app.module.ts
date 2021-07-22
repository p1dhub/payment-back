import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule, UsersModule,PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
