import { Controller, Post } from '@nestjs/common';
import { USER_ROUTING } from '../constants/routing.constants';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StatusResponse } from '../dto/responses/status.response';
import { SignUpRequest } from '../dto/requests/sign-up.request';
import { DefaultDoc } from '../../common/swagger/default-doc.swagger';

@DefaultDoc(USER_ROUTING.MAIN, { showError401: false })
@Controller(USER_ROUTING.MAIN)
export class UsersController {
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
  async registration(): Promise<StatusResponse> {
    return {
      status: true,
    };
  }
}
