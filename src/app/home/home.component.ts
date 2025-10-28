import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Panel } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../service/budget.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Panel, CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private budgetService: BudgetService) {}

  totalCost = 0;

  services = [
    { id: 0, name: 'Seo', basePrice: 300, enabled: false, pages: 0, languages: 0 },
    { id: 1, name: 'Ads', basePrice: 400, enabled: false, pages: 0, languages: 0 },
    { id: 2, name: 'Web', basePrice: 500, enabled: false, pages: 0, languages: 0 },
  ];

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  toggleBorder(event: Event, index: number) {
    const checked = (event.target as HTMLInputElement).checked;
    this.services[index].enabled = checked;
    this.updateTotal();
  }

  updatePanelValues(event: { id: number; pages: number; languages: number }) {
    const service = this.services.find((s) => s.id === event.id);
    if (service) {
      service.pages = event.pages;
      service.languages = event.languages;
      this.updateTotal();
    }
  }

  updateTotal() {
    this.totalCost = this.budgetService.calculateTotal(this.services);
  }

  showHelpModal = false;
  helpType: 'pages' | 'languages' = 'pages';

  openHelpFromPanel(type: 'pages' | 'languages') {
    this.helpType = type;
    this.showHelpModal = true;
  }

  closeModal() {
    this.showHelpModal = false;
  }
}
