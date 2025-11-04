import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Panel } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../service/budget.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Panel, CommonModule, ModalComponent, BudgetsListComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) {}

  totalCost = 0;

  services = [
    { id: 0, name: 'Seo', basePrice: 300, enabled: false, pages: 0, languages: 0 },
    { id: 1, name: 'Ads', basePrice: 400, enabled: false, pages: 0, languages: 0 },
    { id: 2, name: 'Web', basePrice: 500, enabled: false, pages: 0, languages: 0 },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['services']) {
        try {
          const decoded = decodeURIComponent(params['services']);
          const selectedServices = JSON.parse(decoded);

          this.services.forEach((service) => {
            const match = selectedServices.find((s: any) => s.name === service.name);
            if (match) {
              service.enabled = true;
              service.pages = match.pages || 0;
              service.languages = match.languages || 0;
            } else {
              service.enabled = false;
              service.pages = 0;
              service.languages = 0;
            }
          });

          this.updateTotal();
        } catch (e) {
          console.error('Error al decodificar serveis de la URL:', e);
        }
      }
    });
  }

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

  addBudget(form: NgForm) {
    if (!form.valid) return;

    this.budgetService.addBudget({
      clientName: form.value.clientName,
      phone: form.value.phone,
      email: form.value.email,
      total: this.totalCost,
      services: this.services.filter((s) => s.enabled),
      createdAt: new Date(),
    });

    form.resetForm();
    this.totalCost = 0;
    this.services.forEach((s) => (s.enabled = false));

    alert('Pressupost guardat correctament!');
  }
}
