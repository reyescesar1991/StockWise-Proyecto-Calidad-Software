import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IHistoryActivity, IProductStartUI, IStatusStockUI, ISummaryCardsModel } from '../../../../../core/models';
import { ActivityItemComponent } from '../../../../../shared/activity-item/activity-item.component';
import { StockItemComponent } from '../../../../../shared/stock-item/stock-item.component';
import { StockItemStatusDashboardComponent } from '../../../../../shared/stock-item-status-dashboard/stock-item-status-dashboard.component';
import { SummaryCardsComponent } from '../../../../../shared/summary-cards/summary-cards.component';
import { ActionQuickButtonComponent } from '../../../../../shared/action-quick-button/action-quick-button.component';
import { ACTION_QUICK_BUTTONS, ACTION_QUICK_BUTTONS_REPORTS } from '../../../../../core/constants';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ActivityItemComponent, StockItemComponent, StockItemStatusDashboardComponent, SummaryCardsComponent, ActionQuickButtonComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  protected actionsQuickButtons = ACTION_QUICK_BUTTONS;
  protected actionsQuickReportsButtons = ACTION_QUICK_BUTTONS_REPORTS;
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

  protected stockStatusData : Array<IStatusStockUI> = [

    {
      title : 'Productos Activos',
      porcentage : 85,
      typeStatus : 'success'
    },
    {
      title : 'Capacidad Almacén',
      porcentage : 68,
      typeStatus : 'warning'
    },
    {
      title : 'Productos Agotados',
      porcentage : 7,
      typeStatus : 'error'
    }
  ]

  protected summaryCardsData : Array<ISummaryCardsModel> = [
    
    {
      iconType : 'product-icon',
      icon : 'fas fa-box',
      titleCard : 'Total Productos',
      valueCard : 256,
      unit : ''
    },
    {
      iconType : 'money-icon',
      icon : 'fas fa-shopping-cart',
      titleCard : 'Valor Inventario (Venta)',
      valueCard : 12.450,
      unit : '$',
    },
    {
      iconType : 'alert-icon',
      icon : 'fas fa-exclamation-triangle',
      titleCard : 'Productos Stock Bajo',
      valueCard : 12,
      unit : ''
    }
  ];

  
}
