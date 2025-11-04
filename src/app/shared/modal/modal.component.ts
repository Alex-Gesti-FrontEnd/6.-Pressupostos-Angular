import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly isVisible = input<boolean>(false);

  readonly closed = output<void>();

  closeModal(): void {
    this.closed.emit();
  }
}
