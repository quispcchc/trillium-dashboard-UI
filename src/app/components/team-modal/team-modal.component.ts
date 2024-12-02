import { Component, Input, Output, EventEmitter,  } from '@angular/core';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrl: './team-modal.component.css'
})
export class TeamModalComponent {

  @Input() modalOpen!:boolean;
  @Output() closeModal = new EventEmitter<void>();

  modalClosed: boolean = false;

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeTeamModal();
    }
  }

  closeTeamModal() {
    this.modalClosed = true;

    setTimeout(() => {
      this.modalClosed = false;
      this.closeModal.emit();
    }, 250)
  }

}
