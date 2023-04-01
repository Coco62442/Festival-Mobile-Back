import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model, ObjectId } from 'mongoose';
import { Zone, ZoneDocument } from 'src/Schema/Zone.schema';
import { ZoneDTO } from './DTO/zone.dto';
import { ZoneUpdateDTO } from './DTO/zone.update.dto';

@Injectable()
export class ZoneService {
  constructor(
    @InjectModel(Zone.name)
    private readonly zoneModel: Model<ZoneDocument>,
  ) {}

  async getAllZones(): Promise<Zone[]> {
    try {
      const result = await this.zoneModel.find().exec();

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

  async getZoneById(id: string): Promise<Zone> {
    try {
      const zone = await this.zoneModel.findById(id).exec();

      if (!zone) {
        throw new Error('Zone non trouvé');
      }

      return zone;
    } catch (error) {
      switch (error.message) {
        case 'Zone non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Zone introuvable`,
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

  async getZonesByFestival(id: string): Promise<Zone[]> {
    try {
      const zones = await this.zoneModel.find({ idFestival: id }).exec();

      return zones;
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

  async createZone(newZone: ZoneDTO): Promise<Zone> {
    try {
      validateOrReject(newZone);
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
      const zoneCreated = new this.zoneModel(newZone);
      const result = await zoneCreated.save();

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

  async deleteZone(id: string): Promise<Zone> {
    try {
      const zoneDeleted = await this.zoneModel.findByIdAndDelete(id).exec();

      if (!zoneDeleted) {
        throw new Error('Zone non trouvé');
      }

      return zoneDeleted;
    } catch (error) {
      switch (error.message) {
        case 'Zone non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Zone introuvable`,
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

  async updateZone(id: string, updateZone: ZoneUpdateDTO): Promise<Zone> {
    try {
      validateOrReject(updateZone);
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
      const zoneUpdated = await this.zoneModel
        .findByIdAndUpdate(id, updateZone, { new: true })
        .exec();

      if (!zoneUpdated) {
        throw new Error('Zone non trouvé');
      }

      return zoneUpdated;
    } catch (error) {
      switch (error.message) {
        case 'Zone non trouvé':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: `Zone introuvable`,
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
