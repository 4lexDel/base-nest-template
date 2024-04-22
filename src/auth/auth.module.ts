import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

// Roles decorator: https://docs.nestjs.com/fundamentals/execution-context#low-level-approach

// Refresh token implementation and more: https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
//    Better?: https://blog.stackademic.com/jwt-authentication-a-deep-dive-into-access-tokens-and-refresh-tokens-274c6c3b352d
//    Compilation: https://gist.github.com/jengel3/6a49a25b2fc2eb56fcf8b38f5004ea2c