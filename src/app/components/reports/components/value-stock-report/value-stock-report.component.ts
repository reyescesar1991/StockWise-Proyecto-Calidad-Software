import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Product {
  code: string;
  name: string;
  category: string;
  stock: string;
  location: string;
  unitPrice: number;
  totalValue: number;
}


@Component({
  selector: 'app-value-stock-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './value-stock-report.component.html',
  styleUrl: './value-stock-report.component.scss'
})
export class ValueStockReportComponent {
  currentPage: number = 1;
  itemsPerPage: number = 2; // Cambia este valor para mostrar más/menos items por página
  totalPages: number = 0;

  products: Product[] = [
    {
      code: 'PRD-001',
      name: 'Manzanas Orgánicas Fuji',
      category: 'Frutas',
      stock: '120 kg',
      location: 'Bodega Central',
      unitPrice: 1.25,
      totalValue: 150.00
    },
    {
      code: 'PRD-002',
      name: 'Leche Entera 1L',
      category: 'Lácteos',
      stock: '45 unidades',
      location: 'Tienda Principal',
      unitPrice: 0.95,
      totalValue: 42.75
    },
    {
      code: 'PRD-003',
      name: 'Arroz Integral Premium',
      category: 'Granos',
      stock: '200 kg',
      location: 'Bodega Central',
      unitPrice: 2.50,
      totalValue: 500.00
    },
    {
      code: 'PRD-004',
      name: 'Aceite de Oliva Extra Virgen 500ml',
      category: 'Aceites',
      stock: '30 unidades',
      location: 'Tienda Principal',
      unitPrice: 8.75,
      totalValue: 262.50
    },
    {
      code: 'PRD-005',
      name: 'Café Molido Premium 250g',
      category: 'Cafetería',
      stock: '65 unidades',
      location: 'Sucursal Norte',
      unitPrice: 4.50,
      totalValue: 292.50
    },
    // Agrega más productos aquí...
  ];

  constructor() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get subtotal(): number {
    return this.paginatedProducts.reduce((acc, product) => acc + product.totalValue, 0);
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
}
