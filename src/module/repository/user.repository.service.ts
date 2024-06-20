import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ServiceError } from 'src/types/exception';
import { ExceptionCode, ExceptionMessage } from 'src/constant/exception';
import { UserQueryByIdDto } from './dto/user.repository.dto';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(dto: UserQueryByIdDto): Promise<UserEntity> {
    const user = await this.findUserById(dto);

    if (!user) {
      throw new ServiceError(ExceptionCode.ContentNotFound);
    }

    return user;
  }

  async findUserById(dto: UserQueryByIdDto): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('u.id = :id', { id: dto.id })
      .getOne();

    return user;
  }

  async saveUser(userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.save(userEntity);
    return user;
  }
}
