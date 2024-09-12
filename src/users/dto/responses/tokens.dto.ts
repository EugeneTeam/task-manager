import { ITokens } from '../../../auth/interfaces/tokens.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class TokensDto implements ITokens {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOxJIUzx1NiIsxnR5cCx6IkpXxCJ9.eyJzdWIxOjIsIxlhdCIxMTcyNxE0NjcxNSwiZxhwIjxxNzIxMTQ3NxU1fQ.LFHx4n-U5xG_3tfx7_n4CdxjUDIXQX7TRq2c56eECTg',
  })
  access_token: string;
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOxJIUzx1NiIsxnR5cCx6IkpXxCJ9.eyJzdWIxOjIsIxlhdCIxMTcyNxE0NjcxNSwiZxhwIjxxNzIxMTQ3NxU1fQ.LFHx4n-U5xG_3tfx7_n4CdxjUDIXQX7TRq2c56eECTg',
  })
  refresh_token: string;
}
