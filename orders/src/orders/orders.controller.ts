import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrder: CreateOrderDto): Promise<Orders> {
    const req=  await fetch("http://logger:8084/log", {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({
        tmz: new Date().toJSON(),
        msg: "Order has been placed.",
        actor: "order service",
      })
    });
    const b = await req.json();
console.log('data:', b)
    console.log("create orders")
    return this.ordersService.create(createOrder);
  }

  @Get()
  findAll(): Promise<Orders[]> {
    console.log("get all orders")
    return this.ordersService.findAll();
  }

  @Get(':orderID')
  findOne(@Param('orderID') orderID: string): Promise<Orders> {
    return this.ordersService.findOne(orderID);
  }

  @Delete(':orderID')
  remove(@Param('orderID') orderID: string): Promise<void> {
    return this.ordersService.remove(orderID);
  }
}
