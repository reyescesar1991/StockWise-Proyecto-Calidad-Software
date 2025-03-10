import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProductStartUI } from '../../core/models';

@Component({
  selector: 'app-stock-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.scss'
})
export class StockItemComponent {

  @Input() dataItem!: IProductStartUI;

  protected getStatusItem(status : string) : string{

    return `item-stock ${status}`;
  }
}
