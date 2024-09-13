import { HttpStatus } from '@nestjs/common';
import { CodesError } from './codes.error';

type ErrorCodesType = keyof typeof CodesError;

export class CustomError extends Error {
  readonly status: HttpStatus;
  readonly code: string;
  readonly isCustomError = true;

  constructor(errorCode: ErrorCodesType) {
    const error = CodesError[errorCode];
    if (!error) {
      throw new Error('Unknown error code');
    }

    super(error.message);
    this.status = error.status;
    this.code = error.code;
  }
}
