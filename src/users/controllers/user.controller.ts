import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { USER_ROUTING } from '../constants/routing.constants';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StatusResponse } from '../dto/responses/status.response';
import { SignUpRequest } from '../dto/requests/sign-up.request';
import { DefaultDoc } from '../../common/decorators/default-doc.decorator';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { IUser } from '../interfaces/user.interface';
import { ISignUpRequest } from '../interfaces/requests/sign-up-request.interface';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { RefreshTokenGuard } from '../../auth/guards/refresh-token.guard';

@DefaultDoc(USER_ROUTING.MAIN, { showError401: false })
// todo add config to validate pipe
@UsePipes(new ValidationPipe())
@Controller(USER_ROUTING.MAIN)
export class UsersController {
  constructor(private readonly _authService: AuthService) {}

  @Get()
  authorization(@Body() { email, password }) {
    return this._authService.signIn({ email, password });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    // todo add decorator to extract data
    console.log(req['user']);
    console.log(req['headers']);
    const userId = req['user']['sub'];
    const refreshToken = req['header']['refreshToken'];
    return this._authService.updateRefreshToken(
      userId,
      req['headers']['refreshtoken'],
    );
  }

  // todo remove it after test
  @UseGuards(AccessTokenGuard)
  @Put()
  test() {
    return true;
  }

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
    const result = await this._authService.signUp(body);
    return {
      status: result,
    };
  }
}
