import { Component, effect, input, output, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class Panel {
  private readonly fb = inject(FormBuilder);

  readonly serviceId = input<number>(0);
  readonly pages = input<number>(0);
  readonly languages = input<number>(0);

  readonly valuesChanged = output<{ id: number; pages: number; languages: number }>();
  readonly openHelp = output<'pages' | 'languages'>();

  readonly form = this.fb.group({
    pages: [0, [Validators.required, Validators.min(0)]],
    languages: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    effect(() => {
      this.form.patchValue(
        {
          pages: this.pages(),
          languages: this.languages(),
        },
        { emitEvent: false } // evita disparar valueChanges en cada actualización
      );
    });
  }

  incPages(): void {
    this.updateField('pages', (this.form.value.pages ?? 0) + 1);
  }
  decPages(): void {
    const current = this.form.value.pages ?? 0;
    if (current > 0) this.updateField('pages', current - 1);
  }

  incLang(): void {
    this.updateField('languages', (this.form.value.languages ?? 0) + 1);
  }
  decLang(): void {
    const current = this.form.value.languages ?? 0;
    if (current > 0) this.updateField('languages', current - 1);
  }

  private updateField(field: 'pages' | 'languages', value: number): void {
    this.form.patchValue({ [field]: value });
    this.emitValues();
  }

  private emitValues(): void {
    this.valuesChanged.emit({
      id: this.serviceId(),
      pages: this.form.value.pages ?? 0,
      languages: this.form.value.languages ?? 0,
    });
  }
}
