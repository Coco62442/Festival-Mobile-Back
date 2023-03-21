import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Zone, ZoneDocument } from '../Schema/Zone.schema';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>) {}

  async getAllZones(): Promise<Zone[]> {
    try {
      return await this.zoneModel.find().exec();
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
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Zone introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return zone;
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

  async createZone(newZone: Zone): Promise<Zone> {
    try {
      await validateOrReject(newZone);
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
      const createdZone = new this.zoneModel(newZone);
      return await createdZone.save();
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

  async updateZone(id: string, updatedZone: Zone): Promise<Zone> {
    try {
      await validateOrReject(updatedZone);
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
        .findOneAndUpdate({ _id: id }, updatedZone, { new: true })
        .exec();

      if (!zoneUpdated) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Zone introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return zoneUpdated;
    } catch (error) {
      console.log(error);
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
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Zone introuvable`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return zoneDeleted;
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
