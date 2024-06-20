import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RawAxiosRequestHeaders } from 'axios';
import { lastValueFrom } from 'rxjs';

import { LogProvider } from 'src/provider/log.provider';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async sendGetRequest<T>(
    uri: string,
    queryParams: Object,
    headers?: RawAxiosRequestHeaders,
  ): Promise<{ result: boolean; data: T; status?: number; error?: any }> {
    let url: string;
    if (queryParams) {
      url = `${uri}?${Object.entries(queryParams)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`;
    } else {
      url = uri;
    }

    LogProvider.info(
      url,
      queryParams,
      `${HttpClientService.name}.${this.sendGetRequest.name}`,
    );

    try {
      const res$ = this.httpService.get(url, { headers });
      const { data } = await lastValueFrom(res$);

      LogProvider.info(
        `RESPONSE`,
        `${JSON.stringify(data)}`,
        `${HttpClientService.name}.${this.sendGetRequest.name}`,
      );

      return { result: true, data };
    } catch (err) {
      return {
        result: false,
        data: null,
        error: err?.response?.data || { message: err?.message },
        status: err?.response?.status,
      };
    }
  }

  async sendPostRequest<T>(
    url: string,
    body: Object,
    headers?: RawAxiosRequestHeaders,
  ): Promise<{ result: boolean; data: T; status?: number; error?: any }> {
    LogProvider.info(
      url,
      `${HttpClientService.name}.${this.sendPostRequest.name}`,
    );
    try {
      const res$ = this.httpService.post(url, body, { headers });
      const { data } = await lastValueFrom(res$);

      LogProvider.info(
        'RESPONSE',
        `${JSON.stringify(data)}`,
        `${HttpClientService.name}.${this.sendPostRequest.name}`,
      );

      return { result: true, data };
    } catch (err) {
      return {
        result: false,
        data: null,
        error: err?.response?.data,
        status: err?.response?.status,
      };
    }
  }

  async sendPatchRequest<T>(
    url: string,
    body: Object,
    headers?: RawAxiosRequestHeaders,
  ): Promise<{ result: boolean; data: T; status?: number; error?: any }> {
    LogProvider.info(
      url,
      `${HttpClientService.name}.${this.sendPostRequest.name}`,
    );
    try {
      const res$ = this.httpService.patch(url, body, { headers });
      const { data } = await lastValueFrom(res$);

      LogProvider.info(
        'RESPONSE',
        `${JSON.stringify(data)}`,
        `${HttpClientService.name}.${this.sendPostRequest.name}`,
      );

      return { result: true, data };
    } catch (err) {
      return {
        result: false,
        data: null,
        error: err?.response?.data,
        status: err?.response?.status,
      };
    }
  }
}
