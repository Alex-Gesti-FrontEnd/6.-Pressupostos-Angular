import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { BudgetService } from '../service/budget.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: any;
  let mockBudgetService: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockBudgetService = {
      calculateTotal: jasmine.createSpy('calculateTotal').and.returnValue(999),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BudgetService, useValue: mockBudgetService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to welcome', () => {
    component.goToWelcome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
  });

  it('should toggle service enabled state', () => {
    const event = { target: { checked: true } } as any;
    component.toggleBorder(event, 0);
    expect(component.services[0].enabled).toBeTrue();
  });

  it('should update total cost using BudgetService', () => {
    component.updateTotal();
    expect(mockBudgetService.calculateTotal).toHaveBeenCalledWith(component.services);
    expect(component.totalCost).toBe(999);
  });

  it('should open and close modal properly', () => {
    component.openHelpFromPanel('pages');
    expect(component.showHelpModal).toBeTrue();
    expect(component.helpType).toBe('pages');

    component.closeModal();
    expect(component.showHelpModal).toBeFalse();
  });
});
