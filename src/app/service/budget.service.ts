import { Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  readonly pageLangMultiplier = 30;
  readonly budgetsSignal = signal<Budget[]>([]);

  get budgets() {
    return this.budgetsSignal.asReadonly();
  }

  calculateWebCost(pages: number, languages: number): number {
    return pages * languages * this.pageLangMultiplier;
  }

  calculateTotal(
    services: { enabled: boolean; basePrice: number; pages: number; languages: number }[]
  ): number {
    return services.reduce((acc, service) => {
      if (!service.enabled) return acc;
      const webCost = this.calculateWebCost(service.pages, service.languages);
      return acc + service.basePrice + webCost;
    }, 0);
  }

  addBudget(budget: Budget) {
    const current = this.budgetsSignal();
    this.budgetsSignal.set([...current, budget]);
  }

  sortBudgetsBy(criteria: 'date' | 'price' | 'name', direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...this.budgetsSignal()].sort((a, b) => {
      let result = 0;

      if (criteria === 'date') {
        result = (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0);
      } else if (criteria === 'price') {
        result = a.total - b.total;
      } else if (criteria === 'name') {
        result = a.clientName.localeCompare(b.clientName);
      }

      return direction === 'asc' ? result : -result;
    });

    this.budgetsSignal.set(sorted);
  }
}
