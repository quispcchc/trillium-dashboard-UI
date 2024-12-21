import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accessible-forms-modal',
  templateUrl: './accessible-forms-modal.component.html',
  styleUrl: './accessible-forms-modal.component.css'
})
export class AccessibleFormsModalComponent {

  @Input() modalOpen!:boolean;
  @Input() forms!: string[];
  @Input() user_name!: string;
  @Input() bullet_color!: string;

  @Output() closeModal = new EventEmitter<void>();

  dismissModal() {
    this.closeModal.emit()
  }

  getHalfLength(len: number): number {
    return Math.ceil(len / 2);
  }

}
