import { ObjectId } from 'mongoose';

export interface BenevoleReturn {
  id: ObjectId;
  nom: string;
  prenom: string;
  email: string;
  isAdmin: boolean;
}
