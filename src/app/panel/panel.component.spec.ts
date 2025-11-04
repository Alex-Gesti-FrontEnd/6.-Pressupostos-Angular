import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Panel } from './panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('Panel', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel, ReactiveFormsModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment and decrement pages correctly', () => {
    component.incPages();
    expect(component.form.value.pages).toBe(1);

    component.decPages();
    expect(component.form.value.pages).toBe(0);
  });

  it('should increment and decrement languages correctly', () => {
    component.incLang();
    expect(component.form.value.languages).toBe(1);

    component.decLang();
    expect(component.form.value.languages).toBe(0);
  });

  it('should emit valuesChanged with updated values', () => {
    spyOn(component.valuesChanged, 'emit');

    (component as any).serviceId = signal(5);
    fixture.detectChanges();

    component.incPages();
    component.incLang();

    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: 5,
      pages: 1,
      languages: 1,
    });
  });
});
