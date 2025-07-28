import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../common/dto/user-response.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}

export class ProfileResponseDto extends UserResponseDto {
  // Inherits all properties from UserResponseDto
  // This maintains backward compatibility while using the shared DTO
}
