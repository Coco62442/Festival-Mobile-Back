import { ObjectId } from 'mongoose';

export interface BenevoleReturn {
  _id: ObjectId;
  nom: string;
  prenom: string;
  email: string;
  isAdmin: boolean;
}
