import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Festival, FestivalDocument } from '../Schema/Festival.schema';
import { validateOrReject } from 'class-validator';

@Injectable()
export class FestivalService {
  constructor(
    @InjectModel(Festival.name) private festivalModel: Model<FestivalDocument>,
  ) {}

  async getAllFestivals(): Promise<Festival[]> {
    try {
      return await this.festivalModel.find().exec();
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

  async getFestivalById(id: string): Promise<Festival> {
    try {
      const festival = await this.festivalModel.findById(id).exec();

      if (!festival) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Festival introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return festival;
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

  async createFestival(newFestival: Festival): Promise<Festival> {
    try {
      await validateOrReject(newFestival);
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
      return this.festivalModel.create(newFestival);
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

  async deleteFestival(id: string): Promise<void> {
    try {
      const festival = await this.festivalModel.findByIdAndDelete(id).exec();

      if (!festival) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Festival introuvable`,
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

  async updateFestival(
    id: string,
    updatedFestival: Festival,
  ): Promise<Festival> {
    try {
      await validateOrReject(updatedFestival);
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
      const festivalUpdated = await this.festivalModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedFestival },
        { new: true },
      );

      if (!festivalUpdated) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Festival introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return festivalUpdated;
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
