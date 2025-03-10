import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IHistoryActivity, IProductStartUI } from '../../../../../core/models';
import { ActivityItemComponent } from '../../../../../shared/activity-item/activity-item.component';
import { StockItemComponent } from '../../../../../shared/stock-item/stock-item.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ActivityItemComponent, StockItemComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  protected historyData : Array<IHistoryActivity> = [

    {
      operationTitle : 'Entrada de 50 unidades de Manzanas Fuji',
      dateTimeOperation : '10:30 AM',
      typeOperation : 'success',
    },
    {
      operationTitle : 'Producto Pan Integral alcanzó Stock Mínimo',
      dateTimeOperation : '8:00 AM',
      typeOperation : 'warning',
    },
    {
      operationTitle : 'Salida de 25 unidades de Leche Entera',
      dateTimeOperation : '4:45 PM',
      typeOperation : 'error',
    },
    {
      operationTitle : 'Actualización de precio Aceite de Oliva',
      dateTimeOperation : '2:15 PM',
      typeOperation : 'info',
    }
  ]

  protected itemStockData : Array<IProductStartUI> = [

    {
      name : 'Manzanas Fuji',
      currentStock : 8,
      minStock : 15,
      status : 'warning',
    },
    {
      name : 'Leche Entera',
      currentStock : 5,
      minStock : 10,
      status : 'error',
    },
    {
      name : 'Pan Integral',
      currentStock : 12,
      minStock : 20,
      status : 'warning',
    },
    {
      name : 'Papel Higiénico',
      currentStock : 14,
      minStock : 25,
      status : 'warning',
    },
    {
      name : 'Aceite de Oliva',
      currentStock : 3,
      minStock : 8,
      status : 'error',
    },
  ]
}
