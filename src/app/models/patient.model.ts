import { Contact } from './contact.model';

export interface Patient {
  id?: string;
  nom: string;  
  prenom: string; 
  dateNaissance: string;  
  sexe: 'Homme' | 'Femme';  
  taille: number;
  poids: number; 
  contacts: Contact[];
}
