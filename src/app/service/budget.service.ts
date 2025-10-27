import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  pageLangMultiplier = 30;

  constructor() {}

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
}
