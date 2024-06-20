import { Type } from '@nestjs/common';

export class ApiPropertyDto {
  // name: string;
  type: Type;
  example: string | number | null;
  required: boolean;
  description: string;

  constructor(
    type: Type,
    example: string | number | null,
    description: string,
    required: boolean,
  ) {
    this.type = type;
    this.example = example;
    this.description = description;
    this.required = required;
  }
}
