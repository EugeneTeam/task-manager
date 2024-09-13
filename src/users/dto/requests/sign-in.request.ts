import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_CONSTRAINT } from '../../../common/constraints/length.constraints';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ISignInRequest } from '../../interfaces/requests/sign-in-request.interface';

export class SignInRequest implements ISignInRequest {
  @ApiProperty({
    type: String,
    example: 'example@example.com',
    description: 'User email',
    maxLength: LENGTH_CONSTRAINT.EMAIL,
  })
  @IsEmail()
  @MaxLength(LENGTH_CONSTRAINT.EMAIL)
  email: string;

  @ApiProperty({
    type: String,
    example: 'As8$1I_qwe@3',
    description: 'Password',
    minLength: LENGTH_CONSTRAINT.PASSWORD.MIN,
    maxLength: LENGTH_CONSTRAINT.PASSWORD.MAX,
  })
  @IsString()
  @MaxLength(LENGTH_CONSTRAINT.PASSWORD.MAX)
  @MinLength(LENGTH_CONSTRAINT.PASSWORD.MIN)
  password: string;
}
