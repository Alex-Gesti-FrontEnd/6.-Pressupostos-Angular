import { BudgetService } from './budget.service';
import { Budget } from '../models/budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    service = new BudgetService();
  });

  it('should calculate web cost correctly', () => {
    expect(service.calculateWebCost(2, 3)).toBe(180); // 2*3*30
  });

  it('should calculate total only for enabled services', () => {
    const services = [
      { enabled: true, basePrice: 300, pages: 1, languages: 1 },
      { enabled: false, basePrice: 400, pages: 2, languages: 2 },
    ];
    const total = service.calculateTotal(services);
    expect(total).toBe(330);
  });

  it('should add a budget', () => {
    const budget: Budget = {
      clientName: 'Test',
      phone: '123456789',
      email: 'test@test.com',
      total: 500,
      services: [],
      createdAt: new Date(),
    };

    service.addBudget(budget);
    expect(service.budgets().length).toBe(1);
    expect(service.budgets()[0].clientName).toBe('Test');
  });

  it('should sort budgets by price descending', () => {
    const b1 = { clientName: 'A', total: 200, createdAt: new Date() } as Budget;
    const b2 = { clientName: 'B', total: 400, createdAt: new Date() } as Budget;

    service.addBudget(b1);
    service.addBudget(b2);

    service.sortBudgetsBy('price', 'desc');
    const sorted = service.budgets();
    expect(sorted[0].total).toBe(400);
  });
});
