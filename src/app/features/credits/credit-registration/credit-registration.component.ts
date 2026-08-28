import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CreditsService } from '../services/credits.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './credit-registration.component.html',
  styleUrl: './credit-registration.component.css'
})
export class CreditRegistrationComponent {
  private fb = inject(FormBuilder);
  private creditsService = inject(CreditsService);
  private router = inject(Router);

  registroForm = this.fb.group({
    nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
    cedulaCliente: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    comercialNombre: ['', [Validators.required]],
    valorCredito: [0, [Validators.required, Validators.min(1000)]],
    tasaInteres: [0, [Validators.required, Validators.min(0.1), Validators.max(100)]],
    plazoMeses: [0, [Validators.required, Validators.min(1), Validators.max(360)]]
  });

  onSubmit() {
    if (this.registroForm.valid) {
      this.creditsService.crearCredito(this.registroForm.value as any).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Registro Exitoso!',
            text: 'El crédito ha sido guardado correctamente.',
            icon: 'success',
            confirmButtonColor: '#4f46e5',
            confirmButtonText: 'Ver créditos'
          }).then((result) => {
            this.registroForm.reset();
            this.router.navigate(['/consulta']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar: ' + (err.error?.message || 'Error desconocido'),
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      });
    }
  }
}
