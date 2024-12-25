import { Component } from '@angular/core';
import { PatientListComponent } from "../../components/patient-list/patient-list.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PatientListComponent,
    CommonModule,
    MatTableModule,
    MatCardModule,MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
