import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Jour, JourDocument } from '../Schema/Jour.schema';
import { validateOrReject } from 'class-validator';
import { CreneauService } from 'src/Creneau/creneau.service';

@Injectable()
export class JourService {
  constructor(
    @InjectModel(Jour.name) private jourModel: Model<JourDocument>,
    private readonly creneauService: CreneauService,
  ) {}

  async getAllJours(): Promise<Jour[]> {
    try {
      return await this.jourModel.find().exec();
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
      const jour = await this.jourModel.findById(id).exec();

      if (!jour) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Jour introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return jour;
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

  async createJour(newJour: Jour): Promise<Jour> {
    try {
      await validateOrReject(newJour);
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
      newJour.idCreneaux.map(async (idCreneau) => {
        const creneau = await this.creneauService.getCreneauById(idCreneau);

        if (!creneau) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Un des créneaux n'est pas valide`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
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

    try {
      const createdJour = new this.jourModel(newJour);
      return createdJour.save();
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

  async updateJour(id: string, jour: Jour): Promise<Jour> {
    try {
      await validateOrReject(jour);
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
      jour.idCreneaux.map(async (idCreneau) => {
        const creneau = await this.creneauService.getCreneauById(idCreneau);

        if (!creneau) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Un des créneaux n'est pas valide`,
            },
            HttpStatus.NOT_FOUND,
          );
        }
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

    try {
      const jourUpdated = await this.jourModel
        .findByIdAndUpdate(id, jour, { new: true })
        .exec();

      if (!jourUpdated) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Jour introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return jourUpdated;
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

  async deleteJour(id: string): Promise<Jour> {
    try {
      const jourDeleted = await this.jourModel.findByIdAndDelete(id).exec();

      if (!jourDeleted) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Jour introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return jourDeleted;
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
