import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_HOST } from '../../../constant/rabbit.constant';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
