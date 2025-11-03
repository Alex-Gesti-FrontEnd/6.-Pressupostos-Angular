import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit closed event when clicking backdrop', () => {
    component.isVisible = true;
    fixture.detectChanges();

    spyOn(component.closed, 'emit');
    const backdrop = fixture.debugElement.query(By.css('.custom-modal-backdrop'));
    backdrop.triggerEventHandler('click', new Event('click'));
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should display title and message when visible', () => {
    component.isVisible = true;
    component.title = 'Ajuda';
    component.message = 'Missatge de prova';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('h5')).nativeElement;
    const messageEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(titleEl.textContent).toContain('Ajuda');
    expect(messageEl.textContent).toContain('Missatge de prova');
  });
});
