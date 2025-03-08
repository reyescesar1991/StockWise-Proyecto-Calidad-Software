import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  protected userFound : boolean = false;
  protected user : string = '';


  protected searchUser(){

    if(this.user !== ''){
      this.userFound = true;
    }
  }

  protected resetSearchUser(){

    this.user = '';
    this.userFound = false;
  }
}
