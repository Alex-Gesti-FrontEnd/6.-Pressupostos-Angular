import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class Panel {
  pages = 0;
  languages = 0;

  incPages(): void {
    this.pages++;
  }
  decPages(): void {
    if (this.pages > 0) {
      this.pages--;
    }
  }

  incLang(): void {
    this.languages++;
  }
  decLang(): void {
    if (this.languages > 0) {
      this.languages--;
    }
  }
}
