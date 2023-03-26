import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BenevoleService } from 'src/Benevole/benevole.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private configService: ConfigService
    private readonly benevoleService: BenevoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.secret,
    });
  }

  async validate(payload: any) {
    return await this.benevoleService.getBenevoleById(payload.benevole.id)
    .catch(error => {
      throw new UnauthorizedException();
    });   
  }
}