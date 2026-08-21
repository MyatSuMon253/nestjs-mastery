import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import * as config from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<User>>(
        user.id!,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken<Partial<User>>(
        user.id!,
        this.jwtConfiguration.refreshTokenTtl,
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
