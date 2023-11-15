import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createUserName(name: string) {
    return this.client.send({ cmd: 'create-users' }, name);
  }

  getUserName() {
    return this.client.send({ cmd: 'get-all-users' }, {});
  }
}
