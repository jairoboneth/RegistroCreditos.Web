import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CreditRegistrationComponent } from './features/credits/credit-registration/credit-registration.component';
import { CreditListComponent } from './features/credits/credit-list/credit-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: CreditRegistrationComponent, canActivate: [authGuard] },
  { path: 'consulta', component: CreditListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
