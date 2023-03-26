import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BenevoleModule } from 'src/Benevole/benevole.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Strategy/passport.jwt.strategy';

@Module({
  imports: [
    BenevoleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: "cecinestpasunsecret" }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
