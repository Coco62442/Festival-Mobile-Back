import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Affectation, AffectationDocument } from '../Schema/Affectation.schema';
import { validateOrReject } from 'class-validator';
import { AffectationDTO } from './DTO/affectation.dto';
import { AffectationUpdateDTO } from './DTO/affectation.update.dto';

@Injectable()
export class AffectationService {
  constructor(
    @InjectModel(Affectation.name)
    private affectationModel: Model<AffectationDocument>,
  ) {}

  async getAllAffectations(): Promise<Affectation[]> {
    try {
      return await this.affectationModel.find().exec();
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

  async getAffectationById(id: string): Promise<Affectation> {
    try {
      const affectation = await this.affectationModel.findById(id).exec();

      if (!affectation) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Affectation introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return affectation;
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

  async createAffectation(
    newAffectation: AffectationDTO,
  ): Promise<Affectation> {
    try {
      await validateOrReject(newAffectation);
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
      return this.affectationModel.create(newAffectation);
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

  async updateAffectation(
    id: string,
    affectation: AffectationUpdateDTO,
  ): Promise<Affectation> {
    try {
      await validateOrReject(affectation);
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
      const affectationUpdated = await this.affectationModel
        .findByIdAndUpdate(id, affectation, { new: true })
        .exec();

      if (!affectationUpdated) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Affectation introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return affectationUpdated;
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

  async deleteAffectation(id: string): Promise<Affectation> {
    try {
      const affectationDeleted = await this.affectationModel
        .findByIdAndDelete(id)
        .exec();

      if (!affectationDeleted) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Affectation introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return affectationDeleted;
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
