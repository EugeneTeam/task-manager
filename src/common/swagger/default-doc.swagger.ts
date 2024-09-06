import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IDefaultDocOptions } from '../interfaces/default-doc-options.interface';

export function DefaultDoc(
  route: string,
  {
    showError400 = true,
    showError401 = true,
    showError500 = true,
  }: IDefaultDocOptions,
) {
  const decorators: (MethodDecorator & ClassDecorator)[] = [
    ApiTags(route.toUpperCase().replace('/', '')),
  ];

  if (showError400) {
    decorators.push(
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        // todo change description
        description: 'Some validation error',
      }),
    );
  }

  if (showError401) {
    decorators.push(
      ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        // todo change description
        description: 'Unauthorized error',
      }),
    );
  }

  if (showError500) {
    decorators.push(
      ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        // todo change description
        description: 'Some internal error',
      }),
    );
  }

  return applyDecorators(...decorators);
}
