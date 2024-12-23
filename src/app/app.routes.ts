import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'patients', pathMatch: 'full' },
    { path: 'patients', component: PatientListComponent },
    { path: 'patients/add', component: PatientFormComponent },
    { path: 'patients/:id', component: PatientDetailsComponent },
    { path: 'patients/:id/edit', component: PatientFormComponent },
  ];