import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { get } from 'http';
import { Auth, CurrentUser } from 'src/user/user.controller';
import { userInfo } from 'os';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

@Get()
@Auth()
getAll (@CurrentUser('id') userId: number) {
  return this.orderService.getAll(userId)
  }
}
