import { IsNumber, IsString, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class UserQueryByIdDto {
  @IsNumber()
  id: number;

  static async from(params: { id: number }) {
    const instance = plainToInstance(this, {
      ...params,
    });

    const validated = await validate(instance);
    if (validated.length > 0) {
      const messages = validated
        .map((e) => Object.entries(e.constraints)[0][1])
        .toString();
      throw new Error(messages);
    }

    return instance;
  }
}
