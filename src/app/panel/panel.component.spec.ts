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
    expect(component.form.value.pages).toBe(0);
    expect(component.form.value.languages).toBe(0);
  });

  it('should increment pages and emit values', () => {
    spyOn(component.valuesChanged, 'emit');

    component.incPages();
    expect(component.form.value.pages).toBe(1);
    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: 1,
      pages: 1,
      languages: 0,
    });
  });

  it('should decrement pages and emit values', () => {
    component.form.patchValue({ pages: 2 });
    spyOn(component.valuesChanged, 'emit');

    component.decPages();
    expect(component.form.value.pages).toBe(1);
    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: 1,
      pages: 1,
      languages: 0,
    });
  });

  it('should not decrement pages below 0', () => {
    component.form.patchValue({ pages: 0 });
    component.decPages();
    expect(component.form.value.pages).toBe(0);
  });

  it('should increment languages and emit values', () => {
    spyOn(component.valuesChanged, 'emit');

    component.incLang();
    expect(component.form.value.languages).toBe(1);
    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: 1,
      pages: 0,
      languages: 1,
    });
  });

  it('should decrement languages and emit values', () => {
    component.form.patchValue({ languages: 3 });
    spyOn(component.valuesChanged, 'emit');

    component.decLang();
    expect(component.form.value.languages).toBe(2);
    expect(component.valuesChanged.emit).toHaveBeenCalledWith({
      id: 1,
      pages: 0,
      languages: 2,
    });
  });

  it('should not decrement languages below 0', () => {
    component.form.patchValue({ languages: 0 });
    component.decLang();
    expect(component.form.value.languages).toBe(0);
  });

  it('should emit openHelp with correct value when info icon clicked', () => {
    spyOn(component.openHelp, 'emit');
    const infoIcons = fixture.debugElement.queryAll(By.css('i.bi-info-circle'));

    infoIcons[0].triggerEventHandler('click', null);
    expect(component.openHelp.emit).toHaveBeenCalledWith('pages');

    infoIcons[1].triggerEventHandler('click', null);
    expect(component.openHelp.emit).toHaveBeenCalledWith('languages');
  });
});
