import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IStatusStockUI } from '../../core/models';

@Component({
  selector: 'app-stock-item-status-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-item-status-dashboard.component.html',
  styleUrl: './stock-item-status-dashboard.component.scss'
})
export class StockItemStatusDashboardComponent {

  @Input() dataStock !: IStatusStockUI;

  protected getStatusPorcentageStock(porcentage : number) : string{

    return `${Math.min(porcentage, 100)}%`;
  }

  protected getStatusStockType(status : string) : string{

    return `status-fill ${status}`;
  }
}
