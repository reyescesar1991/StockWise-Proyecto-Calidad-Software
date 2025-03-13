import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


interface User {
  id: string;
  name: string;
  role: string;
  location: string;
  status: 'active' | 'inactive';
  actions: {
    editLink: string;
    deleteId: string;
  };
}

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  protected currentPage: number = 1;
  protected itemsPerPage: number = 2; // Cambia este valor para mostrar más/menos items por página
  protected totalPages: number = 0;

  protected usersData: User[] = [
    {
      id: 'USR001',
      name: 'Carlos Ramírez',
      role: 'Administrador de Inventario',
      location: 'Sede Principal',
      status: 'active',
      actions: {
        editLink: 'edit-user.html?id=USR001',
        deleteId: 'USR001'
      }
    },
    {
      id: 'USR002',
      name: 'Ana Martínez',
      role: 'Supervisor de Inventario',
      location: 'Sede Norte',
      status: 'active',
      actions: {
        editLink: 'edit-user.html?id=USR002',
        deleteId: 'USR002'
      }
    },
    {
      id: 'USR003',
      name: 'Luis Gómez',
      role: 'Gestor de Inventario',
      location: 'Sede Sur',
      status: 'active',
      actions: {
        editLink: 'edit-user.html?id=USR003',
        deleteId: 'USR003'
      }
    },
    {
      id: 'USR004',
      name: 'María Pérez',
      role: 'Empleado de Almacén',
      location: 'Sede Este',
      status: 'inactive',
      actions: {
        editLink: 'edit-user.html?id=USR004',
        deleteId: 'USR004'
      }
    },
    {
      id: 'USR005',
      name: 'Juan López',
      role: 'Empleado de Almacén',
      location: 'Sede Principal',
      status: 'active',
      actions: {
        editLink: 'edit-user.html?id=USR005',
        deleteId: 'USR005'
      }
    }
  ];

  constructor() {
    this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
  }

  get paginatedProducts(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usersData.slice(startIndex, endIndex);
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

  protected getStatusUser(status : string) : string {

    return `status-badge ${status}`;
  }

}
