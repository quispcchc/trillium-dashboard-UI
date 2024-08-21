import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  embedUrl: string | null = null;
  embedToken: string | null = null;
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.authService.getPowerBIReport().subscribe(data => {
    //   this.embedUrl = data.embedUrl;
    //   this.embedToken = data.embedToken;
    // });
  }

  // getSafeUrl(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
}