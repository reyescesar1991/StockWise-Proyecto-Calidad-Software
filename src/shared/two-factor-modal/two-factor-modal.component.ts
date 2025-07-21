import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-two-factor-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './two-factor-modal.component.html',
  styleUrl: './two-factor-modal.component.scss'
})
export class TwoFactorModalComponent {

  constructor(public dialogRef: MatDialogRef<TwoFactorModalComponent>, // El tipo aquí debería ser el propio modal
    @Inject(MAT_DIALOG_DATA) public dataSaldo: any ){}
}
