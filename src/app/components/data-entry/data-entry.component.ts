import { Component } from '@angular/core';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent {
  currentFormAction: string = 'accreditation';

  setCurrentForm(action: string): void {
    this.currentFormAction = action;
  }
}