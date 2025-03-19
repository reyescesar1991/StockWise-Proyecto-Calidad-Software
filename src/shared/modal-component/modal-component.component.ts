import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.scss'
})
export class ModalComponentComponent {

  @Input() title: string = 'Modal';
  @Input() isOpen: boolean = false;
  @Input() modalType: 'default' | 'error' | 'success' | 'warning' | 'info' = 'default';
  @Input() data: any;
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
  
  close(): void {
    this.onClose.emit();
  }
  
  confirm(): void {
    this.onConfirm.emit();
  }
}
