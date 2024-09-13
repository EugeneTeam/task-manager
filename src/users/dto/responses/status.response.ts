import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({
    type: Boolean,
    description:
      'Operation execution status. true - operation completed, false - operation failed',
    example: true,
  })
  status: boolean;
}
