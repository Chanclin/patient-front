import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMsgComponent } from '../confirm-msg/confirm-msg.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatTableModule,
    MatCardModule,MatIconModule,MatButtonModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'dateNaissance', 'sexe', 'actions'];  // Correspondre avec les colonnes du backend

  
  constructor(private patientService: PatientService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getPatients();
  }

  addPatient(): void {
    this.router.navigate(['patients/add']);
  }

  // Récupérer la liste des patients depuis le service
  getPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des patients', err);
      }
    });
  }

  editPatient(patient: Patient) {
    // Rediriger vers une route d'édition, par exemple '/edit-patient/:id'
    this.router.navigate(['edit-patient/', patient.id]);
  }
  

  // Action pour supprimer un patient
  deletePatient(id: string): void {
    const dialogRef = this.dialog.open(ConfirmMsgComponent, {
      data: { message: 'Voulez-vous vraiment supprimer ce patient ?' }  // Passer un message au dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si l'utilisateur confirme, on procède à la suppression
        this.patientService.deletePatient(id).subscribe({
          next: () => {
            this.patients = this.patients.filter(patient => patient.id !== id);
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du patient', err);
          }
        });
      }
    });
  }
}
