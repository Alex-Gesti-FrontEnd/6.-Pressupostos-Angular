import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Panel } from '../panel/panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Panel],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  toggleBorder(event: Event, card: HTMLElement) {
    const inputElement = event.target as HTMLInputElement;

    // Desmarcar otros checkboxes
    const inputs = Array.from(
      document.querySelectorAll<HTMLInputElement>('input.form-check-input')
    );
    inputs.forEach((i) => {
      if (i !== inputElement) i.checked = false;
    });

    // Quitar bordes de otras tarjetas
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.option-card'));
    cards.forEach((c) => {
      if (c !== card) c.classList.remove('border', 'border-3', 'border-success');
    });

    // Alternar borde
    if (inputElement.checked) {
      card.classList.add('border', 'border-3', 'border-primary');
    } else {
      card.classList.remove('border', 'border-3', 'border-primary');
    }
  }
}
