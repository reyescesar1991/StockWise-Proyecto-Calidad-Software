import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api-response.interface";
import { IRoles } from "../interfaces/roles/rolesConfig.interface";

@Injectable({
    providedIn: 'root'
})
export class RoleConfigService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getRolesConfigUrl = `${this.apiUrl}/v1/roleConfig/get-roles-by-config-role`;

    getRoles(): Observable<ApiResponse<IRoles>> {
        if (environment.useDummyData) {
            // Simula una respuesta 2FA para un usuario específico
            const dummy2faResponse: ApiResponse<IRoles> = {
                message: 'Roles encontrados en el sistema',
                code: 200,
                data:
                {
                    roles: [
                        {
                            "_id": "67f7f5ff4f0b312a2319fc59",
                            "idRole": "04",
                            "name": "Administrador",
                            "label": "Administrador",
                            idConfigRole : "",
                        },
                        {
                            "_id": "67f7f5ff4f0b312a2319fc58",
                            "idRole": "03",
                            "name": "Gestor de Inventario",
                            "label": "Gestor de Inventario",
                            idConfigRole : "",
                        },
                        {
                            "_id": "67f7f5ff4f0b312a2319fc57",
                            "idRole": "02",
                            "name": "Supervisor de Inventario",
                            "label": "Supervisor de Inventario",
                            idConfigRole : "",
                        },
                        {
                            "_id": "67f7f5ff4f0b312a2319fc56",
                            "idRole": "01",
                            "name": "Empleado de Almacen",
                            "label": "Empleado de Almacén",
                            idConfigRole : "",
                        }
                    ]
                }

            };
            return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<IRoles>>(this.getRolesConfigUrl);
    }
}