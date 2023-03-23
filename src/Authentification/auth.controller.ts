import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { BenevoleCreateDTO } from 'src/Benevole/DTO/benevole.create.dto';
import { BenevoleLoginDTO } from 'src/Benevole/DTO/benevole.login.dto';
import { BenevoleReturn } from 'src/Benevole/Interface/benevoleReturn.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(
    @Body() userData: BenevoleCreateDTO,
  ): Promise<Partial<BenevoleReturn>> {
    return this.authService.register(userData).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post('login')
  async login(@Body() userData: BenevoleLoginDTO): Promise<{ token: string }> {
    return this.authService.login(userData).catch((error) => {
      throw new HttpException(error.message, error.status);
    });
  }
}
