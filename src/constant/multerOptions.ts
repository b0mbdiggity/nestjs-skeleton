import { HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

import { HttpError } from 'src/types/exception';
import { ExceptionCode } from './exception';

export const multerMemoryOptions: MulterOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpError(HttpStatus.BAD_REQUEST, ExceptionCode.InvalidParameter),
        false,
      );
    }
  },

  storage: memoryStorage(),
  limits: {
    // TODO:
    fieldNameSize: 200,
    fields: 20,
    // fileSize: 16777216, // 16MB
    files: 10,
    fieldSize: 1024 * 1024,
  },
};
