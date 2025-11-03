import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent {
  constructor(private budgetService: BudgetService) {}

  searchTerm: string = '';

  get budgets() {
    let list = this.budgetService.budgets();

    if (this.searchTerm.trim()) {
      list = list.filter((b) => b.clientName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    return list;
  }

  currentSort: 'date' | 'price' | 'name' | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(criteria: 'date' | 'price' | 'name') {
    if (this.currentSort === criteria) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = criteria;
      this.sortDirection = 'asc';
    }

    this.budgetService.sortBudgetsBy(criteria, this.sortDirection);
  }

  getArrow(criteria: 'date' | 'price' | 'name'): string {
    if (this.currentSort !== criteria) return '';
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  shareBudget(budget: any) {
    const baseUrl = window.location.origin;

    const servicesData = encodeURIComponent(JSON.stringify(budget.services));

    const shareUrl = `${baseUrl}/home?services=${servicesData}`;

    navigator.clipboard.writeText(shareUrl);
    alert('URL copiada al portapapeles!');
  }
}
