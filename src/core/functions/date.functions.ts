
import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FunctionDateService {
    
    constructor(private readonly datePipe : DatePipe){


    }

    formatDateToYYYYMMDD(date: Date): string | null { // Retorna string | null si usas DatePipe
        return this.datePipe.transform(date, 'yyyy-MM-dd'); // Usa DatePipe para formatear (si usas DatePipe)
        // O usa la función JavaScript simple si prefieres:
        // return this.formatDateToYYYYMMDD_JS(date);
      }
}