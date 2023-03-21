import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Benevole, BenevoleDocument } from '../Schema/Benevole.schema';
import { BenevoleReturn } from './Interface/benevoleReturn.interface';
import { validateOrReject } from 'class-validator';
import { BenevoleCreateDTO } from './DTO/benevole.create.dto';

@Injectable()
export class BenevoleService {
  constructor(
    @InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>,
  ) {}

  async getAllBenevoles(): Promise<BenevoleReturn[]> {
    try {
      const benevoles = await this.benevoleModel.find().exec();

      return benevoles.map((benevole) => {
        return {
          _id: benevole._id as unknown as ObjectId,
          nom: benevole.nom,
          prenom: benevole.prenom,
          email: benevole.email,
          isAdmin: benevole.isAdmin,
        };
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur serveur: ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBenevoleById(id: string): Promise<BenevoleReturn> {
    try {
      const benevole = await this.benevoleModel.findById(id).exec();

      if (!benevole) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Bénévole introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        _id: benevole._id as unknown as ObjectId,
        nom: benevole.nom,
        prenom: benevole.prenom,
        email: benevole.email,
        isAdmin: benevole.isAdmin,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur serveur: ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBenevole(
    newBenevole: BenevoleCreateDTO,
  ): Promise<BenevoleReturn> {
    try {
      await validateOrReject(newBenevole);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Erreur de validation: ${error}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const benevole = await this.benevoleModel.create(newBenevole);
      return {
        _id: benevole._id as unknown as ObjectId,
        nom: benevole.nom,
        prenom: benevole.prenom,
        email: benevole.email,
        isAdmin: benevole.isAdmin,
      };
    } catch (error) {
      if (error.code == 11000) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `Un bénévole avec cet email existe déjà`,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur serveur: ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBenevole(id: string): Promise<void> {
    try {
      const benevole = await this.benevoleModel.findByIdAndDelete(id).exec();

      if (!benevole) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Bénévole introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur serveur: ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBenevole(
    id: string,
    benevole: Benevole,
  ): Promise<BenevoleReturn> {
    try {
      await validateOrReject(benevole);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Erreur de validation: ${error}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const benevoleUpdated = await this.benevoleModel.findOneAndUpdate(
        { _id: id },
        { $set: benevole },
        { new: true },
      );

      if (!benevoleUpdated) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Bénévole introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        _id: benevoleUpdated._id as unknown as ObjectId,
        nom: benevoleUpdated.nom,
        prenom: benevoleUpdated.prenom,
        email: benevoleUpdated.email,
        isAdmin: benevoleUpdated.isAdmin,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erreur serveur: ${error}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
