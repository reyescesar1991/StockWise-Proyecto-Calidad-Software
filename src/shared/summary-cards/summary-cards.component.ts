import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ISummaryCardsModel } from '../../core/models';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss'
})
export class SummaryCardsComponent {

  @Input() summaryItem !: ISummaryCardsModel;

  protected getTypeIcon(typeIcon : string ) : string {

    return `card-icon ${typeIcon}`;
  }

  protected getFasIcon() : string {

    return this.summaryItem.icon;
  }
}
