import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CrearCreditoDto, CreditoDto } from '../../../core/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  private apiUrl = `${environment.apiUrl}/creditos`;

  constructor(private http: HttpClient) { }

  crearCredito(credito: CrearCreditoDto) {
    return this.http.post(this.apiUrl, credito);
  }

  getCreditos() {
    return this.http.get<CreditoDto[]>(this.apiUrl);
  }
}
