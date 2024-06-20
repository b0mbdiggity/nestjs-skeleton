import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';

import { ConfigService } from 'src/module/config/config.service';

@Injectable()
export class SampleService {
  constructor() {}

  async sample(): Promise<any> {}
}
