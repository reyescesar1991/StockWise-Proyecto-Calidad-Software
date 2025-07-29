import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api-response.interface";
import { IHeadquarters } from "../interfaces/location/headquarter/getHeadquarters.interface";

@Injectable({
    providedIn: 'root'
})
export class HeadquarterService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getHeadquartersUrl = `${this.apiUrl}/v1/location/get-headquarters`;

    getHeadquarters(): Observable<ApiResponse<IHeadquarters>> {
        if (environment.useDummyData) {
            // Simula una respuesta 2FA para un usuario específico
            const dummy2faResponse: ApiResponse<IHeadquarters> = {
                message: 'Roles encontrados en el sistema',
                code: 200,
                data:
                {
                    headquarters: [
                        {
                            "_id": "67e3494794aef1393cd0256f",
                            "idHeadquarter": "CAR-HQ-01",
                            "label": "Sede Principal Caracas",
                            "name": "Oficina Central Metropolitana"
                        },
                        {
                            "_id": "67e3494794aef1393cd02570",
                            "idHeadquarter": "VAL-BR-02",
                            "label": "Sucursal Valencia Norte",
                            "name": "Centro de Operaciones Valencia"
                        },
                        {
                            "_id": "67e3494794aef1393cd02571",
                            "idHeadquarter": "MAR-AG-03",
                            "label": "Agencia Maracaibo Centro",
                            "name": "Unidad de Servicio Maracaibo"
                        }
                    ]
                }

            };
            return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<IHeadquarters>>(this.getHeadquartersUrl);
    }
}