import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IActionQuickButton } from '../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-quick-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-quick-button.component.html',
  styleUrl: './action-quick-button.component.scss'
})
export class ActionQuickButtonComponent {

  @Input() actionButton ?: IActionQuickButton;


  constructor(private readonly router: Router){


  }

  protected goToRoute(){

    this.router.navigate([`/${this.actionButton?.route}`]);
  }

  protected getActionButtonIcon(){

    return this.actionButton?.icon;
  }
}
