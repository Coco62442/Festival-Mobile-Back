import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Jour, JourDocument } from 'src/Schema/Jour.schema';
import { JourDTO } from './DTO/jour.dto';
import { JourUpdateDTO } from './DTO/jour.update.dto';

@Injectable()
export class JourService {
  constructor(
    @InjectModel(Jour.name)
    private readonly jourModel: Model<JourDocument>,
  ) {}

  async getAllJours(): Promise<Jour[]> {
    try {
      const result = await this.jourModel.find().exec();

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

  async getJourById(id: string): Promise<Jour> {
    try {
      const result = await this.jourModel.findById(id).exec();

      if (!result) {
        throw new Error('Jour non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Jour non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Jour non trouvé`,
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

  async createJour(newJour: JourDTO): Promise<Jour> {
    try {
      validateOrReject(newJour);
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
      const result = await this.jourModel.create(newJour);

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

  async updateJour(id: string, jour: JourUpdateDTO): Promise<Jour> {
    try {
      validateOrReject(jour);
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
      const updatedJour = await this.jourModel.findByIdAndUpdate(id, jour, {
        new: true,
      });

      if (!updatedJour) {
        throw new Error('Jour non trouvé');
      }

      return updatedJour;
    } catch (error) {
      switch (error.message) {
        case 'Jour non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Jour non trouvé`,
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

  async deleteJour(id: string): Promise<Jour> {
    try {
      const deletedJour = await this.jourModel.findByIdAndDelete(id);

      if (!deletedJour) {
        throw new Error('Jour non trouvé');
      }

      return deletedJour;
    } catch (error) {
      switch (error.message) {
        case 'Jour non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Jour non trouvé`,
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
