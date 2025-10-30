import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    service = new BudgetService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate web cost correctly', () => {
    const result = service.calculateWebCost(2, 3);
    expect(result).toBe(2 * 3 * 30);
  });

  it('should calculate total cost with enabled services', () => {
    const services = [
      { enabled: true, basePrice: 300, pages: 2, languages: 2 },
      { enabled: false, basePrice: 400, pages: 1, languages: 1 },
    ];
    const result = service.calculateTotal(services);
    expect(result).toBe(300 + 2 * 2 * 30);
  });

  it('should return 0 if all services are disabled', () => {
    const services = [{ enabled: false, basePrice: 300, pages: 1, languages: 1 }];
    const result = service.calculateTotal(services);
    expect(result).toBe(0);
  });
});
