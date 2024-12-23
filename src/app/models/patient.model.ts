import { Contact } from './contact.model';

export interface Patient {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string; // Format ISO
  gender: 'Homme' | 'Femme';
  height: number; // Taille en cm
  weight: number; // Poids en kg
  contacts: Contact[];
}
