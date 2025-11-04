import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsListComponent } from './budgets-list.component';
import { BudgetService } from '../service/budget.service';
import { FormsModule } from '@angular/forms';

describe('BudgetsListComponent (signals)', () => {
  let component: BudgetsListComponent;
  let fixture: ComponentFixture<BudgetsListComponent>;
  let mockService: jasmine.SpyObj<BudgetService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('BudgetService', ['budgets', 'sortBudgetsBy']);
    mockService.budgets.and.returnValue([
      {
        clientName: 'Anna',
        total: 300,
        email: 'a@test.com',
        phone: '123',
        services: [],
        createdAt: new Date('2024-01-01'),
      },
      {
        clientName: 'Marc',
        total: 400,
        email: 'm@test.com',
        phone: '456',
        services: [],
        createdAt: new Date('2024-02-01'),
      },
    ]);

    await TestBed.configureTestingModule({
      imports: [BudgetsListComponent, FormsModule],
      providers: [{ provide: BudgetService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter budgets by search term', () => {
    component.searchTerm.set('Anna');
    const result = component.budgets();
    expect(result.length).toBe(1);
    expect(result[0].clientName).toBe('Anna');
  });

  it('should toggle sorting direction when sorting twice by same criteria', () => {
    component.sort('price');
    expect(component.currentSort()).toBe('price');
    expect(component.sortDirection()).toBe('asc');

    component.sort('price');
    expect(component.sortDirection()).toBe('desc');
  });

  it('should call BudgetService.sortBudgetsBy when sorting', () => {
    component.sort('name');
    expect(mockService.sortBudgetsBy).toHaveBeenCalledWith('name', 'asc');
  });

  it('should return correct arrow symbols', () => {
    component.currentSort.set('date');
    component.sortDirection.set('asc');
    expect(component.getArrow('date')).toBe('▲');

    component.sortDirection.set('desc');
    expect(component.getArrow('date')).toBe('▼');
  });
});
