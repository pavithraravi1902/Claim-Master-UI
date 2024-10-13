import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidenavOpened = false;

  constructor(private router: Router) {}

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  // Check if the current route is '/claim'
  isClaimRoute(): boolean {
    return this.router.url === '/claim';
  }
}
