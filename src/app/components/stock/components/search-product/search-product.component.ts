import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StockIndicatorComponent } from '../../../../../shared/stock-indicator/stock-indicator.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, StockIndicatorComponent, FormsModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.scss'
})
export class SearchProductComponent {

  protected productFound : boolean = false;
  protected productSearch : string = ''

  protected searchProduct(){

    if(this.productSearch !== ''){

      this.productFound = true;
    }
  }

}
