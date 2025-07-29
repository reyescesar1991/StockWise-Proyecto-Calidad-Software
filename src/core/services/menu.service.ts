import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api/api-response.interface';
import { IMenuRequest, IMenuResponse } from '../interfaces/menu/menu.interface';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getMenuUrl = `${this.apiUrl}/v1/menu/getMenu`;

    getMenu(
        params: IMenuRequest
    ): Observable<ApiResponse<IMenuResponse>> {
        if (environment.useDummyData) {
            // Simula una respuesta 2FA para un usuario específico
            const dummy2faResponse: ApiResponse<IMenuResponse> = {
                message: 'Menu construido para el usuario',
                code: 200,
                data: {
                    menu: [
                        {
                            "id": "general-reports",
                            "title": "Reportes",
                            "routes": [
                                {
                                    "id": "general-reports",
                                    "name": "Reportes",
                                    "path": "/dashBoard/reportes",
                                    "icon": "reports-icon",
                                    "active": true,
                                    "subroutes": [
                                        {
                                            "id": "report-general",
                                            "name": "Estado general",
                                            "path": "/dashBoard/reportes/reporte-general",
                                            "active": true,
                                            "mainRoute": "general-reports"
                                        },
                                        {
                                            "id": "report-low-stock",
                                            "name": "Bajo stock",
                                            "path": "/dashBoard/reportes/reporte-bajo-stock",
                                            "active": true,
                                            "mainRoute": "general-reports"
                                        },
                                        {
                                            "id": "report-total-stock",
                                            "name": "Valor total inventario",
                                            "path": "/dashBoard/reportes/reporte-total-stock",
                                            "active": true,
                                            "mainRoute": "general-reports"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "products",
                            "title": "Productos",
                            "routes": [
                                {
                                    "id": "products",
                                    "name": "Productos",
                                    "path": "/dashBoard/productos",
                                    "icon": "products-icon",
                                    "active": true,
                                    "subroutes": [
                                        {
                                            "id": "products-registry",
                                            "name": "Registrar producto",
                                            "path": "/dashBoard/productos/registrar-producto",
                                            "active": true,
                                            "mainRoute": "products"
                                        },
                                        {
                                            "id": "products-list",
                                            "name": "Listado de productos",
                                            "path": "/dashBoard/productos/lista-productos",
                                            "active": true,
                                            "mainRoute": "products"
                                        },
                                        {
                                            "id": "products-modify",
                                            "name": "Modificar producto",
                                            "path": "/dashBoard/productos/modificar-producto",
                                            "active": true,
                                            "mainRoute": "products"
                                        },
                                        {
                                            "id": "products-search",
                                            "name": "Buscar producto",
                                            "path": "/dashBoard/productos/buscar-producto",
                                            "active": true,
                                            "mainRoute": "products"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "users",
                            "title": "Administración",
                            "routes": [
                                {
                                    "id": "users",
                                    "name": "Usuarios",
                                    "path": "/dashBoard/usuarios",
                                    "icon": "users-icon",
                                    "active": true,
                                    "subroutes": [
                                        {
                                            "id": "users-update",
                                            "name": "Modificar usuario",
                                            "path": "/dashBoard/usuarios/modificar-usuario",
                                            "active": true,
                                            "mainRoute": "users"
                                        },
                                        {
                                            "id": "users-list",
                                            "name": "Listar usuarios",
                                            "path": "/dashBoard/usuarios/listar-usuarios",
                                            "active": true,
                                            "mainRoute": "users"
                                        },
                                        {
                                            "id": "users-create",
                                            "name": "Crear usuario",
                                            "path": "/dashBoard/usuarios/crear-usuario",
                                            "active": true,
                                            "mainRoute": "users"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "inventory-management",
                            "title": "Inventario",
                            "routes": [
                                {
                                    "id": "inventory-management",
                                    "name": "Gestión de Stock",
                                    "path": "/dashBoard/inventario",
                                    "icon": "inventory-icon",
                                    "active": true,
                                    "subroutes": [
                                        {
                                            "id": "inventory-adjust",
                                            "name": "Ajustar producto",
                                            "path": "/dashBoard/inventario/ajustar-producto",
                                            "active": true,
                                            "mainRoute": "inventory-management"
                                        },
                                        {
                                            "id": "inventory-sales",
                                            "name": "Registrar venta",
                                            "path": "/dashBoard/inventario/registrar-venta",
                                            "active": true,
                                            "mainRoute": "inventory-management"
                                        },
                                        {
                                            "id": "inventory-add",
                                            "name": "Agregar inventario",
                                            "path": "/dashBoard/inventario/agregar-inventario",
                                            "active": true,
                                            "mainRoute": "inventory-management"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            };
            return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<IMenuResponse>>(this.getMenuUrl, params);
    }
}
