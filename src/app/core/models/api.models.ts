export interface LoginDto {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
}

export interface CrearCreditoDto {
  nombreCliente: string;
  cedulaCliente: string;
  comercialNombre: string;
  valorCredito: number;
  tasaInteres: number;
  plazoMeses: number;
}

export interface CreditoDto {
  id: string;
  usuarioId: number;
  nombreUsuario: string;
  nombreCliente: string;
  cedulaCliente: string;
  comercialNombre: string;
  valorCredito: number;
  tasaInteres: number;
  plazoMeses: number;
  fechaRegistro: string;
}
