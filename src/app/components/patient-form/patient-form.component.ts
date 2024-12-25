import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patientForm!: FormGroup;
  sexeOptions = ['Homme', 'Femme'];
  patientId: string | null = null;
  contactTypes = ['EMAIL', 'MOBILE', 'FIXE'];

  constructor(
    private fb: FormBuilder, 
    private patientService: PatientService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.loadPatientData(this.patientId);  // Charger les données si c'est une modification
    }
  }

  loadPatientData(id: string) {
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patientForm.patchValue(patient); // Remplir le formulaire avec les données du patient
        const contactsArray = this.fb.array(
          patient.contacts.map(contact => this.fb.group(contact))
        );
        this.patientForm.setControl('contacts', contactsArray); // Ajouter les contacts
      },
      error: (err) => {
        console.error('Erreur lors du chargement du patient:', err);
        alert('Une erreur est survenue lors du chargement des données.');
      }
    });
  }

  createForm() {
    this.patientForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      taille: ['', [Validators.required, Validators.min(0)]],
      poids: ['', [Validators.required, Validators.min(0)]],
      contacts: this.fb.array([this.createContact()])
    });
  }

  createContact() {
    return this.fb.group({
      type: ['', Validators.required],
      valeur: ['', Validators.required]
    });
  }

  get contacts() {
    return this.patientForm.get('contacts') as FormArray;
  }

  addContact() {
    const contactForm = this.createContact();
    this.contacts.push(contactForm);
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }

  onTypeChange(index: number) {
    const contact = this.contacts.at(index);
    if (contact) {  // Vérifie que contact n'est pas null ou undefined
      const type = contact.get('type')?.value;
    
      // Appliquer une validation spécifique en fonction du type
      if (type === 'EMAIL') {
        contact.get('valeur')?.setValidators([Validators.required, Validators.email]);
      } else if (type === 'MOBILE' || type === 'FIXE') {
        contact.get('valeur')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
      }
    
      contact.get('valeur')?.updateValueAndValidity();
    }
  }
  

  onSubmit() {
    if (this.patientForm && this.patientForm.valid) {  // Vérifie que patientForm n'est pas null
      const patient: Patient = this.patientForm.value;
      if (this.patientId) {
        // Mise à jour d'un patient existant
        this.patientService.updatePatient(this.patientId, patient).subscribe({
          next: (response) => {
            console.log('Patient modifié avec succès:', response);
            alert('Le patient a été modifié avec succès.');
            this.router.navigate(['/patients']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification du patient:', err);
            alert('Une erreur est survenue lors de la modification.');
          }
        });
      } else {
        // Création d'un nouveau patient
        this.patientService.createPatient(patient).subscribe({
          next: (response) => {
            console.log('Patient enregistré avec succès:', response);
            alert('Le patient a été enregistré avec succès.');
            this.patientForm.reset();
          },
          error: (err) => {
            console.error('Erreur lors de l\'enregistrement du patient:', err);
            alert('Une erreur est survenue lors de l\'enregistrement.');
          }
        });
      }
    } else {
      this.patientForm?.markAllAsTouched();  // Utilisation de l'opérateur '?.' pour éviter l'erreur
    }
  }
  
}
