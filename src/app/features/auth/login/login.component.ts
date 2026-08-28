import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email: email!, password: password! }).subscribe({
        next: () => {
          this.router.navigate(['/registro']);
        },
        error: (err) => {
          let errorMessage = 'Usuario o contraseña incorrectos.';
          if (err.status === 0) {
            errorMessage = 'No hay conexión con el servidor. Verifica el CORS en Railway o tu conexión a internet.';
          } else if (err.status === 404) {
            errorMessage = 'Ruta del servidor no encontrada (Error 404). Verifica la URL de la API.';
          } else if (err.error && typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          Swal.fire({
            title: 'Acceso Denegado',
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      });
    }
  }
}
