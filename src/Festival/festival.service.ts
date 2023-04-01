import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Festival, FestivalDocument } from 'src/Schema/Festival.schema';
import { FestivalDTO } from './DTO/festival.dto';
import { FestivalUpdateDTO } from './DTO/festival.update.dto';

@Injectable()
export class FestivalService {
  constructor(
    @InjectModel(Festival.name)
    private readonly festivalModel: Model<FestivalDocument>,
  ) {}

  async getAllFestivals(): Promise<any[]> {
    try {
      const result = await this.festivalModel.find().exec();

      console.log(result)

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

  async getFestivalById(id: string): Promise<Festival> {
    try {
      const result = await this.festivalModel.findById(id).exec();

      if (!result) {
        throw new Error('Festival non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  getFestivalsByBenevole(id: string): Promise<Festival[]> {
    // Benevole is an array of ObjectId
    return this.festivalModel.find({ idBenevoles: id }).exec();
  }

  async createFestival(festivalDTO: FestivalDTO): Promise<Festival> {
    try {
      const festival = new this.festivalModel(festivalDTO);
      await validateOrReject(festival);
      const result = await festival.save();

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  async updateFestival(
    id: string,
    festivalDTO: FestivalUpdateDTO,
  ): Promise<Festival> {
    try {
      validateOrReject(festivalDTO);
      const result = await this.festivalModel
        .findByIdAndUpdate(id, festivalDTO, { new: true })
        .exec();

      if (!result) {
        throw new Error('Festival non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  async deleteFestival(id: string): Promise<Festival> {
    try {
      const result = await this.festivalModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error('Festival non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  async addBenevoleToFestival(
    idFestival: string,
    idBenevole: string,
  ): Promise<Festival> {
    try {
      const result = await this.festivalModel
        .findByIdAndUpdate(
          idFestival,
          { $push: { idBenevoles: idBenevole } },
          { new: true },
        )
        .exec();

      if (!result) {
        throw new Error('Festival non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  async removeBenevoleToFestival(
    idFestival: string,
    idBenevole: string,
  ): Promise<Festival> {
    try {
      const result = await this.festivalModel
        .findByIdAndUpdate(
          idFestival,
          { $pull: { idBenevoles: idBenevole } },
          { new: true },
        )
        .exec();

      if (!result) {
        throw new Error('Festival non trouvé');
      }

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
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

  async changeStateFestival(id: string): Promise<Festival> {
    try {
      const festival = await this.festivalModel.findById(id).exec();
      if (!festival) {
        throw new Error('Festival non trouvé');
      }

      const newIsClosed = !festival.isClosed;

      const result = await this.festivalModel.findByIdAndUpdate(
        id,
        { $set: { isClosed: newIsClosed } },
        { new: true },
      );

      return result;
    } catch (error) {
      switch (error.message) {
        case 'Festival non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Festival non trouvé`,
            },
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
}
