import { HttpStatus } from '@nestjs/common';

export enum ExceptionCode {
  // 400 (Bad Request)
  InvalidParameter = 'INVALID_PARAMETER',
  UnsupportedChainId = 'UNSUPPORTED_CHAIN_ID',
  UnsupportedNetwork = 'UNSUPPORTED_NETWORK',
  UnsupportedChain = 'UNSUPPORTED_CHAIN',
  PaymentInsufficientFunds = 'PAYMENT_INSUFFICIENT_FUNDS', // 잔액 부족
  InvalidPoint = 'INVALID_POINT', // NFT 판매 가격, 사용 요청 포인트 불일치
  PaymentFailure = 'PAYMENT_FAILURE',
  NotRegisterUser = 'NOT_REGISTER_USER',
  NotOkbUser = 'NOT_OKB_USER',

  // 401 (Unauthorized)
  Unauthorized = 'UNAUTHORIZED',
  MissingAuthToken = 'MISSING_AUTHENTICATION_TOKEN',
  InvalidAccessToken = 'INVALID_ACCESS_TOKEN',
  TokenExpired = 'TOKEN_EXPIRED',
  RequestExpired = 'REQUEST_EXPIRED',
  IssueSecretKeyFirst = 'ISSUE_SECRET_KEY_FIRST',
  FailedDecryption = 'FAILED_DECRYPTION',
  InvalidUser = 'INVALID_USER',

  // 403 (Forbidden)
  PermissionDenied = 'PERMISSION_DENIED',
  DeletedContent = 'DELETED_CONTENT',
  PaymentValidationFailed = 'PAYMENT_VALIDATION_FAILED',

  // 404 (Not Found)
  NotFound = 'NOT_FOUND',
  ContentNotFound = 'CONTENT_NOT_FOUND',

  // 409 (Conflict)
  DuplicateRequest = 'DUPLICATE_REQUEST',
  OrderAlreadyInProgress = 'ORDER_ALREADY_IN_PROGRESS', // Order 가 처리중
  OrderUnfulfillable = 'ORDER_UNFULFILLABLE', // finalized or cancelled

  // 500
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  SDKError = 'SDK_ERROR',
  CacheFailure = 'CACHE_FAILURE',
  MaxRetriesExceeded = 'MAX_RETRIES_EXCEEDED',

  // 외부 API 서비스 에러
  PDMPError = 'PDMP_ERROR',

  OKBError = '다음 OKB Error URL 참조',

  UPTNError = 'UPTN_ERROR',

  OkbPointValidate = 'OKB_POINT_IS_NOT_VALIDATE',

  QueryError = 'QUERY_ERROR',

  AlreadyPreparedKyc = 'ALREADY_PREPARED_KYC',
}

export const ExceptionMessage: {
  [key in ExceptionCode]?: string;
} = {
  // 400 (Bad Request)
  [ExceptionCode.InvalidParameter]: 'Invalid Parameter',
  [ExceptionCode.UnsupportedChainId]: 'Unsupported Chain Id',
  [ExceptionCode.PaymentInsufficientFunds]:
    'The payment method has not enough funds to cover for this payment.',
  [ExceptionCode.InvalidPoint]: 'NFT 판매 가격과 사용 요청 포인트 불일치',

  // 401 (Unauthorized)
  // token is null/undefined
  [ExceptionCode.MissingAuthToken]:
    'Access token is missing in the request header.',
  [ExceptionCode.InvalidAccessToken]: 'Invalid Access Token',
  [ExceptionCode.InvalidUser]: 'Invalid User(Address)',

  // jwt verify fail
  [ExceptionCode.TokenExpired]: 'Token expired',

  // 403 (Forbidden)
  [ExceptionCode.DeletedContent]: 'Deleted Content',

  // permission denied
  [ExceptionCode.PermissionDenied]: 'Permission Denied',

  // 404 (Not Found)
  [ExceptionCode.NotFound]: 'Not Found',
  [ExceptionCode.ContentNotFound]: '해당 Content 존재하지 않음',

  [ExceptionCode.OrderAlreadyInProgress]: '해당 오더가 이미 처리중',
  [ExceptionCode.OrderUnfulfillable]: '오더가 취소되거나 완료됨 또는 처리중임',

  // 500
  [ExceptionCode.InternalServerError]: 'Internal server error',

  // 400 (OKB ERROR)
  [ExceptionCode.OKBError]:
    'https://stg-pay.okcashbag.com/document/ocb_payui/error_code/',

  [ExceptionCode.OkbPointValidate]:
    '사용자 포인트 입력값과 판매 가격과 일치하지 않음',
  [ExceptionCode.AlreadyPreparedKyc]: '이미 KYC 준비가 되어있음',
};

export const CodeToStatus: {
  [key in ExceptionCode]: HttpStatus;
} = {
  [ExceptionCode.InvalidParameter]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.UnsupportedChainId]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.MissingAuthToken]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.InvalidAccessToken]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.TokenExpired]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.PermissionDenied]: HttpStatus.FORBIDDEN,
  [ExceptionCode.DeletedContent]: HttpStatus.FORBIDDEN,
  [ExceptionCode.NotFound]: HttpStatus.NOT_FOUND,
  [ExceptionCode.ContentNotFound]: HttpStatus.NOT_FOUND,
  [ExceptionCode.InternalServerError]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.PDMPError]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.OKBError]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.UPTNError]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.Unauthorized]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.RequestExpired]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.IssueSecretKeyFirst]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.FailedDecryption]: HttpStatus.UNAUTHORIZED,
  [ExceptionCode.DuplicateRequest]: HttpStatus.CONFLICT,
  [ExceptionCode.InvalidUser]: HttpStatus.FORBIDDEN,
  [ExceptionCode.PaymentValidationFailed]: HttpStatus.FORBIDDEN,
  [ExceptionCode.PaymentInsufficientFunds]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.SDKError]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.OrderAlreadyInProgress]: HttpStatus.CONFLICT,
  [ExceptionCode.InvalidPoint]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.PaymentFailure]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.UnsupportedNetwork]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.UnsupportedChain]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.CacheFailure]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.MaxRetriesExceeded]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.OkbPointValidate]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.OrderUnfulfillable]: HttpStatus.CONFLICT,
  [ExceptionCode.NotRegisterUser]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.NotOkbUser]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.QueryError]: HttpStatus.BAD_REQUEST,
  [ExceptionCode.AlreadyPreparedKyc]: HttpStatus.CONFLICT,
};
