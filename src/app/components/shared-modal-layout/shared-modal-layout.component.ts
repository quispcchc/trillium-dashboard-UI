import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-modal-layout',
  templateUrl: './shared-modal-layout.component.html',
  styleUrl: './shared-modal-layout.component.css'
})
export class SharedModalLayoutComponent {

  @Input() heading!: string;
  @Input() modalOpen!:boolean;
  @Input() smallModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  modalClosed: boolean = false;

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalClosed = true;

    setTimeout(() => {
      this.modalClosed = false;
      this.closeModal.emit();
    }, 250)
  }
}
