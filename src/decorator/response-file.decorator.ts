import { HttpStatus, HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger';

export const ApiFileResponse = (
  status: HttpStatus = HttpStatus.OK,

  ...mimeTypes: string[]
) =>
  applyDecorators(
    HttpCode(status),
    ApiOkResponse({
      headers: {
        'Content-Type': {
          schema: {
            example: 'application/json',
          },
        },
        'Content-Disposition': {
          schema: {
            allOf: [
              {
                // format: 'string',
                example: 'attachment; filename="tmp.csv"',
              },
            ],
          },
        },
      },
    }),
    ApiProduces(...mimeTypes),
  );
