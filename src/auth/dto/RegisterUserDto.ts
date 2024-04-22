import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
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
}
