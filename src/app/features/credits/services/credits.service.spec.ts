import { TestBed } from '@angular/core/testing';
import { CreditsService } from './credits.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { CrearCreditoDto, CreditoDto } from '../../../core/models/api.models';

describe('CreditsService', () => {
  let service: CreditsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/creditos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreditsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CreditsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with correct payload to create a credit', () => {
    // Arrange
    const newCredit: CrearCreditoDto = {
      nombreCliente: 'Juan Perez',
      cedulaCliente: '123456',
      comercialNombre: 'Asesor',
      valorCredito: 5000,
      tasaInteres: 1.5,
      plazoMeses: 12
    };

    // Act
    service.crearCredito(newCredit).subscribe();

    // Assert
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCredit);
    
    req.flush({}); // Respond with empty success
  });

  it('should send a GET request to fetch credits', () => {
    // Arrange
    const mockCredits: CreditoDto[] = [
      {
        id: '1',
        usuarioId: 1,
        nombreUsuario: 'test',
        nombreCliente: 'Maria',
        cedulaCliente: '987654',
        comercialNombre: 'Asesor2',
        valorCredito: 10000,
        tasaInteres: 2.0,
        plazoMeses: 24,
        fechaRegistro: new Date().toISOString()
      }
    ];

    // Act
    service.getCreditos().subscribe(data => {
      // Assert payload
      expect(data.length).toBe(1);
      expect(data).toEqual(mockCredits);
    });

    // Assert request
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockCredits);
  });
});
