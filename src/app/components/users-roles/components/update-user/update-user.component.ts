import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { USER_PERMISSIONS_SECURITY } from '../../../../../core/constants';

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
  protected activeTab: string = 'personal'; // Tab inicial
  protected arrayPermissionsSecurity = USER_PERMISSIONS_SECURITY;


  protected searchUser(){

    if(this.user !== ''){
      this.userFound = true;
    }
  }

  protected resetSearchUser(){

    this.user = '';
    this.userFound = false;
  }
  
  // Método para cambiar de tab
  protected changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Método para verificar si un tab está activo
  protected isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
