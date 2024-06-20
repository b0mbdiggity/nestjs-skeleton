import { ServiceEntity } from './../module/repository/entities/service.entity';
import { UserEntity } from 'src/module/repository/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      userEntity: UserEntity;
      token: string;

      serviceEntity: ServiceEntity;
    }
  }
}
