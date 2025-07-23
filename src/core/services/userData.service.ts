import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { delay, Observable, of, throwError } from "rxjs";
import { ApiResponse } from "../interfaces/api/api-response.interface";
import { ICustomIdUser, IValidateCustomIdUserResponse } from "../interfaces/dataUser/customIdUser.interface";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    constructor() { }

    private validateUserUrl = `${this.apiUrl}/v1/userData/validate-user`;


    validateUser(params: ICustomIdUser): Observable<ApiResponse<IValidateCustomIdUserResponse>> {
        if (environment.useDummyData) {
            // Simula una respuesta 2FA para un usuario específico
            if (params.userId === 'USER9999') {
                const dummy2faResponse: ApiResponse<IValidateCustomIdUserResponse> = {
                    message: 'El usuario existe en el sistema',
                    code: 200,
                    data: {
                        userId: 'dummy-user-id-123',
                        userExists: true
                    }
                };
                return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
            }

            // Simula un código incorrecto
            const errorResponse = new HttpErrorResponse({
                error: { message: 'Usuario no existe' },
                status: 401
            });
            return throwError(() => errorResponse);
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<IValidateCustomIdUserResponse>>(this.validateUserUrl, params);
    }
}