import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_HOST } from 'src/constant/rabbit.constant';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [RABBIT_HOST],
          queue: 'users_queue',
          queueOptions: {
            durable: true,
          },
          persistent: true,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
