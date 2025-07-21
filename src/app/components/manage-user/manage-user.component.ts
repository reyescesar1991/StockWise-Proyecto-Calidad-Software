import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

  constructor(private readonly router : Router){}

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }
}
