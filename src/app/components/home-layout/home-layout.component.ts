import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  @Input() heading!: string;
  @Input() instructions!: string[];
  @Input() homePage!: boolean;
  @Output() openTeamModal = new EventEmitter<void>();

  constructor(private router: Router){}

  returnToLogin = () => {
    this.router.navigateByUrl('/login');
  }

}
