import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Panel } from './panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PanelComponent', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
    component.serviceId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment pages', () => {
    component.incPages();
    expect(component.form.value.pages).toBe(1);
  });

  it('should decrement pages', () => {
    component.form.patchValue({ pages: 2 });
    component.decPages();
    expect(component.form.value.pages).toBe(1);
  });

  it('should not decrement below 0', () => {
    component.form.patchValue({ pages: 0 });
    component.decPages();
    expect(component.form.value.pages).toBe(0);
  });

  it('should emit valuesChanged when pages are modified', () => {
    spyOn(component.valuesChanged, 'emit');
    component.incPages();
    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: component.serviceId,
      pages: 1,
      languages: 0,
    });
  });

  it('should emit openHelp with correct type', () => {
    spyOn(component.openHelp, 'emit');
    component.openHelp.emit('pages');
    expect(component.openHelp.emit).toHaveBeenCalledWith('pages');
  });
});
