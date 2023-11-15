import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_HOST } from '../../../constant/rabbit.constant';
import { of } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserValidator } from '../../validators/user.validator';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

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
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('[POST] Should return a user created', async () => {
    const userValidator = { name: 'Daniel Morales 4' };

    const createdUserMock = {
      name: 'Daniel Morales 4',
      _id: '65546b8dd129003c4ee2f21a',
      __v: 0,
    };

    const createUserNameSpy = jest
      .spyOn(userService, 'createUserName')
      .mockReturnValue(of(createdUserMock));

    const result = await userController.createUser(userValidator).toPromise();

    expect(result.name).toEqual(userValidator.name);
    expect(createUserNameSpy).toHaveBeenCalledWith(userValidator.name);
  });

  it('[POST] Should return errors for empty name', async () => {
    const userValidator = { name: '' };

    const myDtoObject = plainToInstance(UserValidator, userValidator);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBeGreaterThan(0);
  });
});
