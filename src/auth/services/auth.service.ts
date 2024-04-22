import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createAccessToken(userId: string) {
    return this.jwtService.sign({ id: userId }, { secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'), expiresIn: '15m' });
  }

  async createRefreshToken(userId: string) {
    return this.jwtService.sign({ id: userId }, { secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'), expiresIn: '7d' });
  }

  async signUp(username: string, password: string): Promise<any> {
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.usersService.create(username, hashPassword);
    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(user.userId);
    const refreshToken = await this.createRefreshToken(user.userId);

    return { accessToken, refreshToken };
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const accessToken = await this.createAccessToken(user.userId);
    const refreshToken = await this.createRefreshToken(user.userId);

    return { accessToken, refreshToken };
  }

  async changePassword(username: string, password: string, newPassword: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const hashPassword = await bcrypt.hash(newPassword, 5);

    await this.usersService.updateOne(username, { password: hashPassword });

    return { "info": "password successfully changed" };
  }

  async refresh(refreshToken: string): Promise<any> {
    const decodedToken = this.decodeRefreshToken(refreshToken);    
    const user = await this.usersService.findOneByPk(decodedToken.id);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const newAccessToken = await this.createAccessToken(decodedToken.id);

    return { accessToken: newAccessToken };
  }

  decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
