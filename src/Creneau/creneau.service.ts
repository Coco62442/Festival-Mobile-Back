import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Creneau, CreneauDocument } from 'src/Schema/Creneau.schema';
import { CreneauDTO } from './DTO/creneau.dto';
import { CreneauUpdateDTO } from './DTO/creneau.update.dto';

@Injectable()
export class CreneauService {
  constructor(
    @InjectModel(Creneau.name)
    private readonly creneauModel: Model<CreneauDocument>,
  ) {}

  async getAllCreneaux(): Promise<Creneau[]> {
    try {
      const result = await this.creneauModel.find().exec();

      return result;
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

  async getCreneauById(id: string): Promise<Creneau> {
    try {
      const result = await this.creneauModel.findById(id).exec();

      if (!result) {
        throw new Error('Creneau non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Creneau non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Creneau non trouvé: ${error}`,
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

  async createCreneau(creneauDTO: CreneauDTO): Promise<Creneau> {
    try {
      validateOrReject(creneauDTO);
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
      const result = await this.creneauModel.create(creneauDTO);

      return result;
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

  async updateCreneau(
    id: string,
    creneauUpdateDTO: CreneauUpdateDTO,
  ): Promise<Creneau> {
    try {
      validateOrReject(creneauUpdateDTO);
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
      const updatedCreneau = await this.creneauModel.findByIdAndUpdate(
        id,
        creneauUpdateDTO,
        { new: true },
      );

      if (!updatedCreneau) {
        throw new Error('Creneau non trouvé');
      }

      return updatedCreneau;
    } catch (error) {
      switch (error.message) {
        case 'Creneau non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Creneau non trouvé: ${error}`,
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

  async deleteCreneau(id: string): Promise<Creneau> {
    try {
      const deletedCreneau = await this.creneauModel.findByIdAndDelete(id);

      if (!deletedCreneau) {
        throw new Error('Creneau non trouvé');
      }

      return deletedCreneau;
    } catch (error) {
      switch (error.message) {
        case 'Creneau non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Creneau non trouvé: ${error}`,
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

  async deleteCreneauxByJour(idJour: string): Promise<boolean> {
    try {
      const result = await this.creneauModel.deleteMany({ idJour: idJour });

      return result.acknowledged
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
