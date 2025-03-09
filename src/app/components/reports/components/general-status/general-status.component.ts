import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Product {
  code: string;
  name: string;
  category: string;
  price: number;
  stock: {
    quantity: number;
    unit: string;
    progress: number;
    status: 'normal' | 'low' | 'critical';
  };
}

@Component({
  selector: 'app-general-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-status.component.html',
  styleUrl: './general-status.component.scss'
})
export class GeneralStatusComponent {

  currentPage: number = 1;
  itemsPerPage: number = 2; // Cambia este valor para mostrar más/menos items por página
  totalPages: number = 0;

  protected products: Product[] = [
    {
      code: 'P001',
      name: 'Manzanas Orgánicas Fuji',
      category: 'Frutas',
      price: 1.99,
      stock: {
        quantity: 85,
        unit: 'kg',
        progress: 85,
        status: 'normal'
      }
    },
    {
      code: 'P002',
      name: 'Leche Entera 1L',
      category: 'Lácteos',
      price: 2.50,
      stock: {
        quantity: 120,
        unit: 'unidades',
        progress: 120,
        status: 'normal'
      }
    },
    {
      code: 'P003',
      name: 'Pechuga de Pollo 1kg',
      category: 'Carnes',
      price: 5.99,
      stock: {
        quantity: 32,
        unit: 'kg',
        progress: 32,
        status: 'low'
      }
    },
    {
      code: 'P004',
      name: 'Pan Integral 700g',
      category: 'Panadería',
      price: 3.25,
      stock: {
        quantity: 15,
        unit: 'unidades',
        progress: 15,
        status: 'critical'
      }
    },
    {
      code: 'P005',
      name: 'Coca-Cola 2L',
      category: 'Bebidas',
      price: 2.99,
      stock: {
        quantity: 78,
        unit: 'unidades',
        progress: 78,
        status: 'normal'
      }
    },
    {
      code: 'P006',
      name: 'Atún en Lata 170g',
      category: 'Enlatados',
      price: 1.75,
      stock: {
        quantity: 45,
        unit: 'unidades',
        progress: 45,
        status: 'low'
      }
    }
  ];

  constructor() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }

  protected getStockStatusClass(status: 'normal' | 'low' | 'critical'): string {
    // Devuelve la clase CSS correspondiente al estado del stock
    return `stock-status stock-${status}`;
  }
  
  protected getStatusColor(status: 'normal' | 'low' | 'critical'): string {
    // Devuelve el color correspondiente según el estado
    switch(status) {
      case 'normal':
        return 'var(--success-color)'; // Verde
      case 'low':
        return 'var(--warning-color)'; // Amarillo/Naranja
      case 'critical':
        return 'var(--error-color)';   // Rojo
      default:
        return 'var(--default-color)'; // Color por defecto
    }
  }


  protected calculateProgressWidth(progress: number) : string{
    return `${Math.min(progress, 100)}%`;
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
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
