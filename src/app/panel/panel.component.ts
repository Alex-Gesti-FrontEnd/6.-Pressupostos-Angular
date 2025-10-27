import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class Panel {
  @Input() serviceId!: number;

  @Output() valuesChanged = new EventEmitter<{
    id: number;
    pages: number;
    languages: number;
  }>();

  form = new FormGroup({
    pages: new FormControl(0, [Validators.required, Validators.min(0)]),
    languages: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  incPages(): void {
    const newValue = (this.form.value.pages ?? 0) + 1;
    this.form.patchValue({ pages: newValue });
    this.emitValues();
  }
  decPages(): void {
    const current = this.form.value.pages ?? 0;
    if (current > 0) {
      this.form.patchValue({ pages: current - 1 });
      this.emitValues();
    }
  }

  incLang(): void {
    const newValue = (this.form.value.languages ?? 0) + 1;
    this.form.patchValue({ languages: newValue });
    this.emitValues();
  }
  decLang(): void {
    const current = this.form.value.languages ?? 0;
    if (current > 0) {
      this.form.patchValue({ languages: current - 1 });
      this.emitValues();
    }
  }

  emitValues(): void {
    this.valuesChanged.emit({
      id: this.serviceId,
      pages: this.form.value.pages ?? 0,
      languages: this.form.value.languages ?? 0,
    });
  }
}
