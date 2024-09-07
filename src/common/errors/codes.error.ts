import { HttpStatus } from '@nestjs/common';

export const CodesError = Object.freeze({
  EmailIsUsed: {
    code: 'EmailIsUsed',
    message: 'The email is already in used',
    status: HttpStatus.BAD_REQUEST,
  },
  InvalidCredential: {
    code: 'InvalidCredentials',
    message: 'Login or password is invalid',
    status: HttpStatus.UNAUTHORIZED,
  },
  UserNotFound: {
    code: 'UserNotFound',
    message: 'User not found',
    status: HttpStatus.NOT_FOUND,
  },
});
