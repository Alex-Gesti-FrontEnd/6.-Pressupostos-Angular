import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../service/budget.service';
import type { Budget } from '../models/budget';

@Component({
  selector: 'app-budgets-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  private readonly budgetService = inject(BudgetService);

  readonly searchTerm = signal('');
  readonly currentSort = signal<'date' | 'price' | 'name' | null>(null);
  readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly budgets = computed(() => {
    let list = this.budgetService.budgets();

    const term = this.searchTerm().trim().toLowerCase();
    if (term) {
      list = list.filter((b: Budget) => b.clientName.toLowerCase().includes(term));
    }

    return list;
  });

  sort(criteria: 'date' | 'price' | 'name'): void {
    if (this.currentSort() === criteria) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.currentSort.set(criteria);
      this.sortDirection.set('asc');
    }

    this.budgetService.sortBudgetsBy(criteria, this.sortDirection());
  }

  getArrow(criteria: 'date' | 'price' | 'name'): string {
    if (this.currentSort() !== criteria) return '';
    return this.sortDirection() === 'asc' ? '▲' : '▼';
  }

  shareBudget(budget: Budget): void {
    const baseUrl = window.location.origin;
    const servicesData = encodeURIComponent(JSON.stringify(budget.services));
    const shareUrl = `${baseUrl}/home?services=${servicesData}`;

    navigator.clipboard.writeText(shareUrl);
    alert('URL copiada al portapapeles!');
  }
}
