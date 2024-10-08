import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
import { AuthService } from '../../auth/services/auth.service';
import { RefreshTokenGuard } from '../../auth/guards/refresh-token.guard';
import { TokensDto } from '../dto/responses/tokens.dto';
import { configService } from '../../common/services/config.service';
import { SignInRequest } from '../dto/requests/sign-in.request';

@DefaultDoc(USER_ROUTING.MAIN, { showError401: false })
@Controller(USER_ROUTING.MAIN)
export class UsersController {
  constructor(private readonly _authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in',
  })
  @ApiBody({
    type: SignInRequest,
  })
  @ApiOkResponse({
    type: TokensDto,
  })
  @UsePipes(new ValidationPipe(configService.getValidatePipeOptions()))
  @HttpCode(HttpStatus.OK)
  @Post(USER_ROUTING.SIGN_IN)
  public async authorization(@Body() body: SignInRequest): Promise<TokensDto> {
    return this._authService.signIn(body);
  }

  @ApiOperation({
    summary: 'Refresh user access token',
    description: 'Refresh user access token',
  })
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({
    type: StatusResponse,
  })
  @Get(`${USER_ROUTING.TOKEN.MAIN}${USER_ROUTING.TOKEN.REFRESH}`)
  public async refreshTokens(@Req() req: Request) {
    await this._authService.updateRefreshToken(
      req?.['user']['s?.ub'],
      req?.['headers']?.['refreshtoken'],
    );
    return {
      status: true,
    };
  }

  @ApiOperation({
    summary: 'Sign up',
    description: 'Sign up',
  })
  @ApiBody({
    type: SignUpRequest,
  })
  @ApiOkResponse({
    type: StatusResponse,
  })
  @Post(USER_ROUTING.SIGN_UP)
  async registration(@Body() body: SignUpRequest): Promise<StatusResponse> {
    const result = await this._authService.signUp(body);
    return {
      status: result,
    };
  }
}
