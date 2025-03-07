import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StockIndicatorComponent } from '../../../../../shared/stock-indicator/stock-indicator.component';


@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, StockIndicatorComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.scss'
})
export class SearchProductComponent {

}
