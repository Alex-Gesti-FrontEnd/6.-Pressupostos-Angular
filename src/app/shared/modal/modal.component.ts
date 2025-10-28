import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() isVisible = false;

  @Output() closed = new EventEmitter<void>();

  closeModal(): void {
    this.closed.emit();
  }
}
