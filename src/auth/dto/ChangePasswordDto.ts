import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The username', type: String, example: 'john' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password',
    type: String,
    example: 'changeme',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The new password',
    type: String,
    example: 'newpassword',
  })
  newPassword: string;
}
