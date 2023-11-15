import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { generateUID } from 'src/utils/randomId.util';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createUserName(name: string) {
    const messageId = generateUID();
    const message = {
      id: messageId,
      name,
    };
    console.log(`Send message Id ${messageId}`);
    const response = this.client.send(
      { cmd: 'create-users' },
      JSON.stringify(message),
    );

    return response;
  }

  getUserName() {
    return this.client.send({ cmd: 'get-all-users' }, {});
  }
}
