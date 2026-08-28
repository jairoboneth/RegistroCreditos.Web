import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CreditsService } from '../services/credits.service';
import { CreditoDto } from '../../../core/models/api.models';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-credit-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    DatePipe,
    CurrencyPipe,
    PercentPipe
  ],
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit {
  private creditsService = inject(CreditsService);

  displayedColumns: string[] = ['fechaRegistro', 'nombreCliente', 'cedulaCliente', 'comercialNombre', 'valorCredito', 'tasaInteres', 'plazoMeses'];
  dataSource = new MatTableDataSource<CreditoDto>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarCreditos();
  }

  cargarCreditos() {
    this.creditsService.getCreditos().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error al cargar créditos', err)
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
