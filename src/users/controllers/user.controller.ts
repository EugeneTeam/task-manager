import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { USER_ROUTING } from '../constants/routing.constants';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StatusResponse } from '../dto/responses/status.response';
import { SignUpRequest } from '../dto/requests/sign-up.request';
import { DefaultDoc } from '../../common/decorators/default-doc.decorator';
import { UserService } from '../services/user.service';

@DefaultDoc(USER_ROUTING.MAIN, { showError401: false })
// todo add config to validate pipe
@UsePipes(new ValidationPipe())
@Controller(USER_ROUTING.MAIN)
export class UsersController {
  constructor(private readonly _userService: UserService) {}

  authorization() {}

  @ApiOperation({
    summary: 'New user registration',
    description: 'New user registration',
  })
  @ApiBody({
    type: SignUpRequest,
  })
  @ApiOkResponse({
    type: StatusResponse,
  })
  @Post()
  async registration(@Body() body: SignUpRequest): Promise<StatusResponse> {
    const result = await this._userService.signUp(body);
    return {
      status: result,
    };
  }
}
