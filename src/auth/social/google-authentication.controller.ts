import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleAuthenticationService } from './google-authentication.service';
import { GoogleTokenDto } from './dto/google-token.dto';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
