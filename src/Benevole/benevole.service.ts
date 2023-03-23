import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Benevole, BenevoleDocument } from 'src/Schema/Benevole.schema';
import { BenevoleCreateDTO } from './DTO/benevole.create.dto';
import { BenevoleUpdateDTO } from './DTO/benevole.update.dto';
import { BenevoleReturn } from './Interface/benevoleReturn.interface';

@Injectable()
export class BenevoleService {
  constructor(
    @InjectModel(Benevole.name)
    private readonly benevoleModel: Model<BenevoleDocument>,
  ) {}

  async getAllBenevole(): Promise<BenevoleReturn[]> {
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
        throw new Error('Bénévole non trouvé');
      }

      return {
        _id: benevole._id as unknown as ObjectId,
        nom: benevole.nom,
        prenom: benevole.prenom,
        email: benevole.email,
        isAdmin: benevole.isAdmin,
      };
    } catch (error) {
      switch (error.message) {
        case 'Bénévole non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Bénévole introuvable`,
            },
            HttpStatus.NOT_FOUND,
          );

        default:
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

  async createBenevole(
    newBenevole: BenevoleCreateDTO,
  ): Promise<BenevoleReturn> {
    try {
      validateOrReject(newBenevole);
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
      const benevole = new this.benevoleModel(newBenevole);
      const benevoleCreated = await benevole.save();

      return {
        _id: benevoleCreated._id as unknown as ObjectId,
        nom: benevoleCreated.nom,
        prenom: benevoleCreated.prenom,
        email: benevoleCreated.email,
        isAdmin: benevoleCreated.isAdmin,
      };
    } catch (error) {
      switch (error.code) {
        case 11000:
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              error: `L'email ${newBenevole.email} est déjà utilisé`,
            },
            HttpStatus.CONFLICT,
          );
        default:
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

  async deleteBenevole(id: string): Promise<BenevoleReturn> {
    try {
      const benevoleDeleted = await this.benevoleModel
        .findByIdAndDelete(id)
        .exec();

      if (!benevoleDeleted) {
        throw new Error('Bénévole non trouvé');
      }

      return {
        _id: benevoleDeleted._id as unknown as ObjectId,
        nom: benevoleDeleted.nom,
        prenom: benevoleDeleted.prenom,
        email: benevoleDeleted.email,
        isAdmin: benevoleDeleted.isAdmin,
      };
    } catch (error) {
      switch (error.message) {
        case 'Bénévole non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Bénévole introuvable`,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
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

  async updateBenevole(
    id: string,
    updateBenevole: BenevoleUpdateDTO,
  ): Promise<BenevoleReturn> {
    try {
      validateOrReject(updateBenevole);
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
      const benevoleUpdated = await this.benevoleModel
        .findByIdAndUpdate(id, updateBenevole, { new: true })
        .exec();

      if (!benevoleUpdated) {
        throw new Error('Bénévole non trouvé');
      }

      return {
        _id: benevoleUpdated._id as unknown as ObjectId,
        nom: benevoleUpdated.nom,
        prenom: benevoleUpdated.prenom,
        email: benevoleUpdated.email,
        isAdmin: benevoleUpdated.isAdmin,
      };
    } catch (error) {
      switch (error.message) {
        case 'Bénévole non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Bénévole introuvable`,
            },
            HttpStatus.NOT_FOUND,
          );

        default:
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
}
