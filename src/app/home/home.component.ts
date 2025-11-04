import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Panel } from '../panel/panel.component';
import { BudgetService } from '../service/budget.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Panel, ModalComponent, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly budgetService = inject(BudgetService);

  readonly services = signal([
    { id: 0, name: 'Seo', basePrice: 300, enabled: false, pages: 0, languages: 0 },
    { id: 1, name: 'Ads', basePrice: 400, enabled: false, pages: 0, languages: 0 },
    { id: 2, name: 'Web', basePrice: 500, enabled: false, pages: 0, languages: 0 },
  ]);

  readonly showHelpModal = signal(false);
  readonly helpType = signal<'pages' | 'languages'>('pages');

  readonly totalCost = computed(() => this.budgetService.calculateTotal(this.services()));

  constructor() {
    effect(() => {
      this.route.queryParams.subscribe((params) => {
        if (params['services']) {
          try {
            const decoded = decodeURIComponent(params['services']);
            const selectedServices = JSON.parse(decoded);

            this.services.update((list) =>
              list.map((s) => {
                const match = selectedServices.find((m: any) => m.name === s.name);
                return match
                  ? {
                      ...s,
                      enabled: true,
                      pages: match.pages ?? 0,
                      languages: match.languages ?? 0,
                    }
                  : { ...s, enabled: false, pages: 0, languages: 0 };
              })
            );
          } catch (e) {
            console.error('Error al decodificar serveis de la URL:', e);
          }
        }
      });
    });
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  toggleBorder(event: Event, index: number) {
    const checked = (event.target as HTMLInputElement).checked;
    this.services.update((list) => {
      list[index].enabled = checked;
      return [...list];
    });
  }

  updatePanelValues(event: { id: number; pages: number; languages: number }) {
    this.services.update((list) =>
      list.map((s) =>
        s.id === event.id ? { ...s, pages: event.pages, languages: event.languages } : s
      )
    );
  }

  openHelpFromPanel(type: 'pages' | 'languages') {
    this.helpType.set(type);
    this.showHelpModal.set(true);
  }

  closeModal() {
    this.showHelpModal.set(false);
  }

  addBudget(form: NgForm) {
    if (!form.valid) return;

    this.budgetService.addBudget({
      clientName: form.value.clientName,
      phone: form.value.phone,
      email: form.value.email,
      total: this.totalCost(),
      services: this.services().filter((s) => s.enabled),
      createdAt: new Date(),
    });

    form.resetForm();
    this.services.update((list) => list.map((s) => ({ ...s, enabled: false })));
    alert('Pressupost guardat correctament!');
  }
}
