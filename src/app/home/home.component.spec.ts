import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BudgetService } from '../service/budget.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: any;
  let mockBudgetService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockBudgetService = {
      calculateTotal: jasmine.createSpy('calculateTotal').and.returnValue(1200),
      addBudget: jasmine.createSpy('addBudget'),
      budgets: () => [],
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BudgetService, useValue: mockBudgetService },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to welcome when goToWelcome is called', () => {
    component.goToWelcome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
  });

  it('should toggle service enabled state', () => {
    const event = { target: { checked: true } } as any;
    component.toggleBorder(event, 0);
    expect(component.services[0].enabled).toBeTrue();
    expect(mockBudgetService.calculateTotal).toHaveBeenCalled();
  });

  it('should update panel values correctly', () => {
    component.updatePanelValues({ id: 0, pages: 3, languages: 2 });
    expect(component.services[0].pages).toBe(3);
    expect(component.services[0].languages).toBe(2);
    expect(mockBudgetService.calculateTotal).toHaveBeenCalled();
  });

  it('should add a budget and reset the form', () => {
    const formMock = {
      valid: true,
      value: {
        clientName: 'Anna',
        phone: '123456789',
        email: 'anna@test.com',
      },
      resetForm: jasmine.createSpy('resetForm'),
    } as any;

    spyOn(window, 'alert');

    component.totalCost = 500;
    component.services[0].enabled = true;

    component.addBudget(formMock);

    expect(mockBudgetService.addBudget).toHaveBeenCalled();
    expect(formMock.resetForm).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Pressupost guardat correctament!');
  });

  it('should not add budget if form is invalid', () => {
    const formMock = { valid: false } as any;
    component.addBudget(formMock);
    expect(mockBudgetService.addBudget).not.toHaveBeenCalled();
  });

  it('should open and close modal correctly', () => {
    component.openHelpFromPanel('pages');
    expect(component.showHelpModal).toBeTrue();
    expect(component.helpType).toBe('pages');

    component.closeModal();
    expect(component.showHelpModal).toBeFalse();
  });
});
