import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  Get,
  Request
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from '../dto/RegisterUserDto';
import { RefreshTokenDto } from '../dto/RefreshTokenDto';
import { ChangePasswordDto } from '../dto/ChangePasswordDto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register' })
  signUp(@Body() signUpDto: RegisterUserDto) {  
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login' })
  signIn(@Body() signInDto: RegisterUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  @Public()
  @ApiOperation({ summary: 'Change password' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto.username, changePasswordDto.password, changePasswordDto.newPassword);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @Public()
  @ApiOperation({ summary: 'Refresh the access token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto.refreshToken);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get personnal user informations' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}