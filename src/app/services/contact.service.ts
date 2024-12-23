import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Patient } from '../models/patient.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/patients/contacts`;

  constructor(private http: HttpClient) {}

  // Ajouter un contact à un patient
  addContact(patientId: string, contact: Contact): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/${patientId}`, contact);
  }

  // Modifier un contact
  updateContact(patientId: string, contactIndex: number, contact: Contact): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patientId}/${contactIndex}`, contact);
  }

  // Supprimer un contact
  deleteContact(patientId: string, contactIndex: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/${patientId}/${contactIndex}`);
  }
}
