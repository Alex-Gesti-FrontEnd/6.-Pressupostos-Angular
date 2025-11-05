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

  it('should display title and message when visible', () => {
    fixture.componentRef.setInput('isVisible', true);
    fixture.componentRef.setInput('title', 'Ajuda');
    fixture.componentRef.setInput('message', 'Missatge de prova');
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('h5')).nativeElement;
    const messageEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(titleEl.textContent).toContain('Ajuda');
    expect(messageEl.textContent).toContain('Missatge de prova');
  });
});
