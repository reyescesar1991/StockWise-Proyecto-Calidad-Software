import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainContentAppComponent } from './components/main-content-app/main-content-app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-board-user',
  standalone: true,
  imports: [NavBarComponent, MainContentAppComponent, CommonModule],
  templateUrl: './dash-board-user.component.html',
  styleUrl: './dash-board-user.component.scss'
})
export class DashBoardUserComponent {

}
