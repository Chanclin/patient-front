import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-msg',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-msg.component.html',
  styleUrl: './confirm-msg.component.css'
})
export class ConfirmMsgComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
