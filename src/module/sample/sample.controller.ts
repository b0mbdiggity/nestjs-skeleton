import {
  Controller,
  HttpCode,
  Inject,
  Post,
  Get,
  UseGuards,
  HttpStatus,
  Query,
  Body,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SampleService } from './sample.service';
import { ResponseData } from 'src/decorator/response-data.decorator';
import { ExceptionCode } from 'src/constant/exception';
import { ResponsesDataDto } from 'src/dto/responses-data.dto';
import { HttpError } from 'src/types/exception';
import { ConfigService } from '../config/config.service';
import { ResponseException } from 'src/decorator/response-exception.decorator';
import { AuthorizationToken } from 'src/constant/authorization-token';

@Controller({
  path: 'sample',
})
export class SampleController {
  constructor(
    @Inject(REQUEST)
    private req: Request,

    @Inject(SampleService)
    private readonly testService: SampleService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getUser(): Promise<ResponsesDataDto<any>> {
    const result = await this.testService.sample();

    return new ResponsesDataDto(result);
  }
}
