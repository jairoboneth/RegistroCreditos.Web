import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/auth`;

  beforeEach(() => {
    // Limpiamos el localStorage antes de cada prueba
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificamos que no hayan peticiones HTTP pendientes
    httpMock.verify();
  });

  it('should initialize with isAuthenticated false when no token exists', () => {
    // Assert
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should store token and update signal on successful login', () => {
    // Arrange
    const credentials = { email: 'test@empresa.com', password: '123' };
    const mockResponse = { token: 'fake-jwt-token' };

    // Act
    service.login(credentials).subscribe();

    // Assert (HTTP)
    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);

    // Assert (State)
    expect(localStorage.getItem('jwt_token')).toBe('fake-jwt-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should not update state if login response lacks a token', () => {
    // Arrange
    const credentials = { email: 'test@empresa.com', password: '123' };
    const mockResponse = { }; // Sin token

    // Act
    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/login`);
    req.flush(mockResponse);

    // Assert
    expect(localStorage.getItem('jwt_token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should remove token and update signal on logout', () => {
    // Arrange
    localStorage.setItem('jwt_token', 'existing-token');
    // Forzamos la señal manual ya que el constructor solo evalúa una vez en beforeEach
    service.isAuthenticated.set(true); 

    // Act
    service.logout();

    // Assert
    expect(localStorage.getItem('jwt_token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
