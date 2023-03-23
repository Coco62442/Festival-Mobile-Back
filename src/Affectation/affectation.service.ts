import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import {
  Affectation,
  AffectationDocument,
} from 'src/Schema/Affectation.schema';
import { AffectationDTO } from './DTO/affectation.dto';
import { AffectationUpdateDTO } from './DTO/affectation.update.dto';

@Injectable()
export class AffectationService {
  constructor(
    @InjectModel(Affectation.name)
    private readonly affectationModel: Model<AffectationDocument>,
  ) {}

  async getAllAffectations(): Promise<Affectation[]> {
    try {
      const result = await this.affectationModel.find().exec();

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

  async getAffectationById(id: string): Promise<Affectation> {
    try {
      const result = await this.affectationModel.findById(id).exec();

      if (!result) {
        throw new Error('Affectation non trouvé');
      }

      return result[0];
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

  async createAffectation(affectation: AffectationDTO): Promise<Affectation> {
    try {
      const newAffectation = new this.affectationModel(affectation);
      await validateOrReject(newAffectation);
      const result = await newAffectation.save();

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

  async deleteAffectation(id: string): Promise<Affectation> {
    try {
      const result = await this.affectationModel.findByIdAndDelete(id);

      if (!result) {
        throw new Error('Affectation non trouvé');
      }

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

  async updateAffectation(
    id: string,
    affectation: AffectationUpdateDTO,
  ): Promise<Affectation> {
    try {
      const result = await this.affectationModel.findByIdAndUpdate(
        id,
        affectation,
        { new: true },
      );

      if (!result) {
        throw new Error('Affectation non trouvé');
      }

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

  async addBenevoleToAffectation(
    idAffectation: string,
    idBenevole: string,
  ): Promise<Affectation> {
    try {
      const result = await this.affectationModel.findByIdAndUpdate(
        idAffectation,
        { $push: { idBenevoles: idBenevole } },
        { new: true },
      );

      if (!result) {
        throw new Error('Affectation non trouvé');
      }

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

  async removeBenevoleToAffectation(
    idAffectation: string,
    idBenevole: string,
  ): Promise<Affectation> {
    try {
      const result = await this.affectationModel.findByIdAndUpdate(
        idAffectation,
        { $pull: { idBenevoles: idBenevole } },
        { new: true },
      );

      if (!result) {
        throw new Error('Affectation non trouvé');
      }

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
}
