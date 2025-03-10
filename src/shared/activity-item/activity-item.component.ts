import { Component, Input } from '@angular/core';
import { IHistoryActivity } from '../../core/models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-activity-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-item.component.html',
  styleUrl: './activity-item.component.scss'
})
export class ActivityItemComponent {

  @Input() dataHistory!: IHistoryActivity;

  protected getStatusActivity(status : string) : string {

    return `activity-icon ${status}`;
  }

}
