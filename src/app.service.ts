import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): Object {
    return { status: 'Running!' };
  }
}
