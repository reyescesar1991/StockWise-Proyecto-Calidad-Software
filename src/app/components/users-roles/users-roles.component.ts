import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-roles',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './users-roles.component.html',
  styleUrl: './users-roles.component.scss'
})
export class UsersRolesComponent {

}
