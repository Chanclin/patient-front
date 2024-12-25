import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Contact } from '../../models/contact.model';
import { MatIcon } from '@angular/material/icon';
import { ContactService } from '../../services/contact.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatDialogModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient | null = null;
  loading = true;
  error: string | null = null;
  showContactForm = false; // Ajouter cette propriété
  selectedContact: Contact | null = null;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private contactService: ContactService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPatientDetails(id);
    } else {
      this.error = 'Identifiant patient non fourni.';
      this.loading = false;
    }
  }

  fetchPatientDetails(id: string): void {
    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        this.patient = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des détails du patient.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  deleteContact(index: number) {
    if (this.patient && this.patient.id) {
      const patientId = this.patient.id; // S'assurer que `id` est défini
      this.contactService.deleteContact(patientId, index).subscribe({
        next: () => {
          alert('Contact supprimé avec succès');
          // Vérifiez que patient existe avant d'appeler la méthode
          if (this.patient) {
            this.fetchPatientDetails(patientId); // Recharger les détails du patient
          }
        },
        error: (err) => {
          alert('Erreur lors de la suppression du contact');
        },
      });
    }
  }

  onContactFormSubmit(contact: Contact) {
    if (this.isEditing && this.patient && this.patient.id) {
      this.contactService
        .updateContact(
          this.patient.id,
          this.patient.contacts.indexOf(this.selectedContact!),
          contact
        )
        .subscribe({
          next: (patient) => {
            this.patient = patient;
            this.showContactForm = false; // Cacher le formulaire
            alert('Contact mis à jour');
          },
          error: (err) => {
            alert('Erreur lors de la mise à jour du contact');
          },
        });
    } else if (!this.isEditing && this.patient && this.patient.id) {
      this.contactService.addContact(this.patient.id, contact).subscribe({
        next: (patient) => {
          this.patient = patient;
          this.showContactForm = false; // Cacher le formulaire
          alert('Contact ajouté');
        },
        error: (err) => {
          alert("Erreur lors de l'ajout du contact");
        },
      });
    }
  }

  cancelContactForm() {
    this.showContactForm = false;
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }

  openContactDialog(contact?: Contact) {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '400px',
      data: { contact },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (contact) {
          // Modifier un contact existant
          this.editContact(this.patient!.contacts.indexOf(contact), result);
        } else {
          // Ajouter un nouveau contact
          this.addNewContact(result);
        }
      }
    });
  }

  addNewContact(contact: Contact) {
    // Appelez le service pour ajouter un contact
    if (this.patient?.id) {
      this.contactService.addContact(this.patient.id, contact).subscribe({
        next: (updatedPatient) => {
          this.patient = updatedPatient;
        },
        error: (err) => {
          alert("Erreur lors de l'ajout du contact.");
        },
      });
    }
  }

  editContact(index: number, contact: Contact) {
    if (this.patient?.id) {
      this.contactService
        .updateContact(this.patient.id, index, contact)
        .subscribe({
          next: (updatedPatient) => {
            this.patient = updatedPatient;
          },
          error: (err) => {
            alert('Erreur lors de la mise à jour du contact.');
          },
        });
    }
  }
}
