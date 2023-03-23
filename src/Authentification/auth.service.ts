import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BenevoleService } from '../Benevole/benevole.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BenevoleLoginDTO } from 'src/Benevole/DTO/benevole.login.dto';
import { BenevoleReturn } from 'src/Benevole/Interface/benevoleReturn.interface';
import { BenevoleCreateDTO } from 'src/Benevole/DTO/benevole.create.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly benevoleService: BenevoleService,
    private jwtService: JwtService,
  ) {}

  async register(userData: BenevoleCreateDTO): Promise<BenevoleReturn> {
    try {
      validateOrReject(userData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Erreur de validation: ${error}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const { email, password } = userData;

    // TODO: Change this secret
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
    return await this.benevoleService
      .createBenevole(userData)
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  async login(userInfo: BenevoleLoginDTO): Promise<{ token: string }> {
    try {
      validateOrReject(userInfo);
    }  catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Erreur de validation: ${error}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email, password } = userInfo;
    return await this.benevoleService
      .verifLogin(email, password)
      .then(async (user) => {
        const payload = {
          user: user,
        };
        const jwt = await this.jwtService.sign(payload);
        return {
          token: jwt,
        };
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }
}
