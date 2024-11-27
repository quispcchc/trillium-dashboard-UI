import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() tabList!: { name: string, label: string, img: string, action: () => void }[] | undefined;
  @Output() logoutUser = new EventEmitter<void>();

  scrollUp(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  logout():void {
    this.logoutUser.emit();
  }

}
