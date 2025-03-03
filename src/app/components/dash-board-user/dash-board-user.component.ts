import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainContentAppComponent } from './components/main-content-app/main-content-app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-board-user',
  standalone: true,
  imports: [NavBarComponent, MainContentAppComponent, CommonModule, RouterOutlet],
  templateUrl: './dash-board-user.component.html',
  styleUrl: './dash-board-user.component.scss'
})
export class DashBoardUserComponent {

  displayHidden: string = '';


  catchDisplayHidden(display: string): void {
    // Este método se ejecuta cuando el hijo emite el evento 'mensajeAlPadre'
    // El parámetro 'mensaje' contiene la información enviada por el hijo.
    this.displayHidden = display;
    console.log("Mensaje recibido del hijo:", display);
  }

  catchDisplayShow(display: string): void{

    this.displayHidden = display;
    console.log("Mensaje recibido del hijo" , display);
    
  }
}
