import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'patients', pathMatch: 'full' },
    { path: 'patients', component: HomeComponent },
    { path: 'patients/add', component: PatientFormComponent },
    { path: 'patients/:id', component: PatientDetailsComponent },
    { path: 'edit-patient/:id', component: PatientFormComponent },
    { path: 'voir', component: ContactDialogComponent },
  ];