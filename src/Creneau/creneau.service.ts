import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Creneau, CreneauDocument } from '../Schema/Creneau.schema';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CreneauService {
  constructor(
    @InjectModel(Creneau.name) private creneauModel: Model<CreneauDocument>,
  ) {}

  async getAllCreneaux(): Promise<Creneau[]> {
    try {
      return await this.creneauModel.find().exec();
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
      const creneau = await this.creneauModel.findById(id).exec();

      if (!creneau) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Creneau introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return creneau;
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

  async createCreneau(newCreneau: Creneau): Promise<Creneau> {
    try {
      await validateOrReject(newCreneau);
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
      const creneau = new this.creneauModel(newCreneau);
      return await creneau.save();
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

  async updateCreneau(id: string, updatedCreneau: Creneau): Promise<Creneau> {
    try {
      await validateOrReject(updatedCreneau);
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
      const creneau = await this.creneauModel
        .findByIdAndUpdate(id, updatedCreneau, { new: true })
        .exec();

      if (!creneau) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Creneau introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return creneau;
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

  async deleteCreneau(id: string): Promise<Creneau> {
    try {
      const creneauDeleted = await this.creneauModel
        .findByIdAndDelete(id)
        .exec();

      if (!creneauDeleted) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Jour introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return creneauDeleted;
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
