import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api-response.interface";
import { IDepartments } from "../interfaces/location/department/getDepartments.interface";
import { IHeadquarterIdRequest } from "../interfaces/location/headquarter/getHeadquarters.interface";

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getDepartmentsUrl = `${this.apiUrl}/v1/location/get-departments-by-headquarter`;

    getDepartments(params : IHeadquarterIdRequest): Observable<ApiResponse<IDepartments>> {
        if (environment.useDummyData) {
            // Simula una respuesta 2FA para un usuario específico
            const dummy2faResponse: ApiResponse<IDepartments> = {
                message: 'Roles encontrados en el sistema',
                code: 200,
                data:
                {
                    departments: [
                        {
                            "_id": "67eead413bf36442a108d301",
                            "idDepartment": "ADM01",
                            "label": "Administración",
                            "name": "Administración",
                        },
                        {
                            "_id": "67eead413bf36442a108d304",
                            "idDepartment": "ALM01",
                            "label": "Almacén",
                            "name": "Almacén",
                        },
                        {
                            "_id": "67eead413bf36442a108d305",
                            "idDepartment": "RRHH01",
                            "label": "Recursos Humanos",
                            "name": "Recursos Humanos",
                        },
                        {
                            "_id": "67eead413bf36442a108d302",
                            "idDepartment": "CMP01",
                            "label": "Compras",
                            "name": "Compras",
                        },
                        {
                            "_id": "67eead413bf36442a108d303",
                            "idDepartment": "VNT01",
                            "label": "Ventas",
                            "name": "Ventas",
                        }
                    ]
                }

            };
            return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<IDepartments>>(this.getDepartmentsUrl, params);
    }
}