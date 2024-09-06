import { ApiProperty } from '@nestjs/swagger';
import { LENGTH_CONSTRAINT } from '../../../common/constraints/length.constraints';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpRequest {
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
    example: 'John',
    description: 'User first name',
    maxLength: LENGTH_CONSTRAINT.FIRST_NAME,
  })
  @IsString()
  @MaxLength(LENGTH_CONSTRAINT.FIRST_NAME)
  first_name: string;

  @ApiProperty({
    type: String,
    example: 'Smith',
    description: 'User last name',
    maxLength: LENGTH_CONSTRAINT.LAST_NAME,
  })
  @IsString()
  @MaxLength(LENGTH_CONSTRAINT.LAST_NAME)
  last_name: string;

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
