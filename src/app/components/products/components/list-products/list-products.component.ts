import { Component, NgModule } from '@angular/core';
import { IProductModel } from '../../../../../core/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  protected currentPage: number = 1;
  protected itemsPerPage: number = 2;
  protected totalItems: number = 0;
  protected totalPages: number = 0;
  protected visiblePages: number[] = [];
  protected filteredProducts: any[] = [];
  protected allProducts: any = [];
  protected Math = Math;
  protected searchTerm: string = '';
  protected searchCategoryTerm: string = '';

  ngOnInit() {

    this.loadProducts();
  }

  private loadProducts() {
    // Ejemplo de datos - reemplazar con tu data real
    this.allProducts = [
      {
        productImage: 'Imagen de manzanas',
        name: 'Manzanas Fuji',
        category: 'Frutas',
        initialStock: 150,
        sellingPrice: 1.99
      },
      {
        productImage: 'Image of Leche Entera',
        name: 'Leche Entera 1L',
        category: 'lacteos',
        initialStock: 80,
        sellingPrice: 2.50
      },
      {
        productImage: 'Image of Pechuga de Pollo',
        name: 'Pechuga de Pollo 1kg',
        category: 'Carnes',
        initialStock: 50,
        sellingPrice: 7.99
      },
      {
        productImage: 'Image of Pan Integral',
        name: 'Pan Integral 700g',
        category: 'Panadería',
        initialStock: 30,
        sellingPrice: 3.50
      },
      {
        productImage: 'Image of Arroz Blanco',
        name: 'Arroz Blanco 1kg',
        category: 'Granos',
        initialStock: 200,
        sellingPrice: 0.99
      },
      {
        productImage: 'Image of Huevos Docena',
        name: 'Huevos Docena',
        category: 'lacteos',
        initialStock: 120,
        sellingPrice: 2.20
      },
      {
        productImage: 'Image of Aceite de Oliva',
        name: 'Aceite de Oliva 500ml',
        category: 'Aceites',
        initialStock: 60,
        sellingPrice: 8.50
      },
      {
        productImage: 'Image of Pasta Spaghetti',
        name: 'Pasta Spaghetti 500g',
        category: 'Pastas',
        initialStock: 180,
        sellingPrice: 1.10
      },
      {
        productImage: 'Image of Tomates Rojos',
        name: 'Tomates Rojos 1kg',
        category: 'Verduras',
        initialStock: 90,
        sellingPrice: 2.75
      },
      {
        productImage: 'Image of Plátanos Canarias',
        name: 'Plátanos Canarias',
        category: 'Frutas',
        initialStock: 110,
        sellingPrice: 1.50
      },
      {
        productImage: 'Image of Queso Gouda',
        name: 'Queso Gouda 200g',
        category: 'lacteos',
        initialStock: 70,
        sellingPrice: 4.80
      },
      {
        productImage: 'Image of Detergente Lavadora',
        name: 'Detergente Lavadora 3L',
        category: 'limpieza',
        initialStock: 40,
        sellingPrice: 6.20
      },
    ];

    this.totalItems = this.allProducts.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updateVisiblePages();
    this.updateFilteredProducts();
  }

  protected updateVisiblePages() {
    const maxVisiblePages = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

    console.log(start);
    console.log(end);
    console.log(this.currentPage);
    console.log(this.totalPages);
    
    
    
    

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    console.log(this.visiblePages);

  }

  protected goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateVisiblePages();
    this.updateFilteredProducts();
    this.updateFilteredCategoryProducts();
  }

  protected previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  protected nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  private updateFilteredProducts() {
    console.log(this.searchTerm);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log("start index filtro = ", startIndex);
    
    const endIndex = startIndex + this.itemsPerPage;

    console.log("end index filtro = ", endIndex);

    const filtered = this.allProducts.filter((product: { name: string; }) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log(filtered);
    

    this.filteredProducts = filtered.slice(startIndex, endIndex);

    console.log(this.filteredProducts);
    

    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    

  }

  protected applySearchFilter() {
    this.currentPage = 1; 
    this.updateVisiblePages();
    this.updateFilteredProducts();
  }

  protected applySearchCategoryFilter(){
    this.currentPage = 1;
    this.updateFilteredCategoryProducts();
    this.updateVisiblePages();
  }

  private updateFilteredCategoryProducts(){

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    const endIndex = (startIndex) + this.itemsPerPage;

    const filtered = this.allProducts.filter((product : {category: string}) =>
      product.category.toLowerCase().includes(this.searchCategoryTerm.toLowerCase())
    )

    console.log(filtered);
    

    this.filteredProducts = filtered.slice(startIndex, endIndex);

    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    console.log(this.totalPages);
  }

  protected clearFilters() {
    this.loadProducts();
  }

}
