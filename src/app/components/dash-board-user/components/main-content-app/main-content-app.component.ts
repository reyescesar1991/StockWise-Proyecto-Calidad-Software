import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content-app',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './main-content-app.component.html',
  styleUrl: './main-content-app.component.scss'
})
export class MainContentAppComponent {

}
