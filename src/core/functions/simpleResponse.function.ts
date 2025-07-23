import { inject, Injectable } from "@angular/core";
import { SnackNotificationService } from "../services/snackBar.service";
import { ApiResponse } from "../interfaces/api/api-response.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SimpleResponseFunction{

    constructor(){}

    private snackBar = inject(SnackNotificationService)

    public sendSimpleResponseOk(response : ApiResponse<void>) {

        this.snackBar.success(response.message);
    }

    public sendSimpleResponseError(response : HttpErrorResponse) {

        this.snackBar.error(response.error.message);
    }
}