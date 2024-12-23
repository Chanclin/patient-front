import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientFormComponent } from "./components/patient-form/patient-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'patient-front';
}
