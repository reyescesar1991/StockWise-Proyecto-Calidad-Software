import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StockReport {
  product: string;
  category: string;
  currentStock: {
    value: number;
    unit: string;
  };
  minStock: {
    value: number;
    unit: string;
  };
  deficit: {
    value: number;
    unit: string;
  };
  status: 'critical' | 'warning';
  needsOrder: boolean;
}

@Component({
  selector: 'app-low-stock-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './low-stock-report.component.html',
  styleUrl: './low-stock-report.component.scss'
})
export class LowStockReportComponent {

  protected currentPage: number = 1;
  protected itemsPerPage: number = 2; // Cambia este valor para mostrar más/menos items por página
  protected totalPages: number = 0;
  protected totalItems : number = 0;
  protected totalItemsEnd: number = 0;
  protected totalItemsStart: number = 1;
  protected Math = Math;
  protected searchTerm: string = '';

  protected stockReportData: StockReport[] = [
    {
      product: 'Leche Entera',
      category: 'Lácteos',
      currentStock: { value: 5, unit: 'Litros' },
      minStock: { value: 20, unit: 'Litros' },
      deficit: { value: -15, unit: 'Litros' },
      status: 'critical',
      needsOrder: true
    },
    {
      product: 'Manzanas Orgánicas Fuji',
      category: 'Frutas',
      currentStock: { value: 3, unit: 'Kilos' },
      minStock: { value: 15, unit: 'Kilos' },
      deficit: { value: -12, unit: 'Kilos' },
      status: 'critical',
      needsOrder: true
    },
    {
      product: 'Pan Integral',
      category: 'Panadería',
      currentStock: { value: 8, unit: 'Unidades' },
      minStock: { value: 10, unit: 'Unidades' },
      deficit: { value: -2, unit: 'Unidades' },
      status: 'warning',
      needsOrder: true
    },
    {
      product: 'Café Molido',
      category: 'Bebidas',
      currentStock: { value: 2, unit: 'Kilos' },
      minStock: { value: 10, unit: 'Kilos' },
      deficit: { value: -8, unit: 'Kilos' },
      status: 'critical',
      needsOrder: true
    },
    {
      product: 'Arroz Integral',
      category: 'Granos',
      currentStock: { value: 15, unit: 'Kilos' },
      minStock: { value: 20, unit: 'Kilos' },
      deficit: { value: -5, unit: 'Kilos' },
      status: 'warning',
      needsOrder: true
    },
    {
      product: 'Papel Higiénico',
      category: 'Limpieza',
      currentStock: { value: 12, unit: 'Paquetes' },
      minStock: { value: 15, unit: 'Paquetes' },
      deficit: { value: -3, unit: 'Paquetes' },
      status: 'warning',
      needsOrder: true
    },
    {
      product: 'Aceite de Oliva',
      category: 'Condimentos',
      currentStock: { value: 3, unit: 'Litros' },
      minStock: { value: 12, unit: 'Litros' },
      deficit: { value: -9, unit: 'Litros' },
      status: 'critical',
      needsOrder: true
    },
    {
      product: 'Yogurt Natural',
      category: 'Lácteos',
      currentStock: { value: 8, unit: 'Unidades' },
      minStock: { value: 12, unit: 'Unidades' },
      deficit: { value: -4, unit: 'Unidades' },
      status: 'warning',
      needsOrder: true
    },
    {
      product: 'Detergente Líquido',
      category: 'Limpieza',
      currentStock: { value: 2, unit: 'Litros' },
      minStock: { value: 10, unit: 'Litros' },
      deficit: { value: -8, unit: 'Litros' },
      status: 'critical',
      needsOrder: true
    }
  ];

  ngOnInit(){

  }

  constructor() {
    this.totalPages = Math.ceil(this.stockReportData.length / this.itemsPerPage);
    this.totalItemsEnd = this.stockReportData.length;
  }

  get paginatedProducts(): StockReport[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.stockReportData.slice(startIndex, endIndex);
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


  protected getStatusItem(status: string) : string {

    switch(status){

      case 'critical':
        return 'critical-row';
      
      case 'warning':
        return 'warning-row';
      
      default:
        return '';
    }
  }

  protected getStatusBadge(status: 'warning' | 'critical'): string{

    return `status-badge ${status}`;
  }

}
