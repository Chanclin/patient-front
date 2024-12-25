import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css'],
})
export class ContactDialogComponent {
  contactForm: FormGroup;
  contactTypes = ['EMAIL', 'MOBILE', 'FIXE'];
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { contact?: Contact }
  ) {
    this.isEditing = !!data.contact;
    this.contactForm = this.fb.group({
      type: [data.contact?.type || '', [Validators.required]],
      valeur: [data.contact?.valeur || '', [Validators.required]],
    });
  }
  onTypeChange(event: any): void {
    const type = event.value;
    // Vous pouvez ajouter ici des validations conditionnelles selon le type sélectionné.
    if (type === 'EMAIL') {
      this.contactForm.get('valeur')?.setValidators([Validators.required, Validators.email]);
    } else if (type === 'MOBILE' || type === 'FIXE') {
      this.contactForm.get('valeur')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
    }
    this.contactForm.get('valeur')?.updateValueAndValidity();
  }
}
