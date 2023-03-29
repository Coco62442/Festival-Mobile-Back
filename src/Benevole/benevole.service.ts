import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Benevole, BenevoleDocument } from 'src/Schema/Benevole.schema';
import { BenevoleCreateDTO } from './DTO/benevole.create.dto';
import { BenevoleUpdateDTO } from './DTO/benevole.update.dto';
import { BenevoleReturn } from './Interface/benevoleReturn.interface';
import * as bcrypt from 'bcrypt';

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
          id: benevole._id as unknown as ObjectId,
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
        id: benevole._id as unknown as ObjectId,
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
        id: benevoleCreated._id as unknown as ObjectId,
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
        id: benevoleDeleted._id as unknown as ObjectId,
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

    // TODO: Change this secret
    const salt = await bcrypt.genSalt(10);
    updateBenevole.password = await bcrypt.hash(updateBenevole.password, salt);

    try {
      const benevoleUpdated = await this.benevoleModel
        .findByIdAndUpdate(id, updateBenevole, { new: true })
        .exec();

      if (!benevoleUpdated) {
        throw new Error('Bénévole non trouvé');
      }

      return {
        id: benevoleUpdated._id as unknown as ObjectId,
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

  async verifLogin(email: string, mdp: string): Promise<BenevoleReturn> {
    try {
      const benevole = await this.benevoleModel
        .findOne({ email: email })
        .exec();

      if (!benevole) {
        throw new HttpException(
          "L'identifiant ou le mot de passe est invalide",
          HttpStatus.NOT_FOUND,
        );
      }
      const isPasswordValid = await bcrypt.compare(mdp, benevole.password);

      if (!isPasswordValid) {
        throw new HttpException(
          "L'identifiant ou le mot de passe est invalide",
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        id: benevole._id as unknown as ObjectId,
        nom: benevole.nom,
        prenom: benevole.prenom,
        email: benevole.email,
        isAdmin: benevole.isAdmin,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
