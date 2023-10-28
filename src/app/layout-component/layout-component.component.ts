import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css']
})
export class LayoutComponentComponent {
  title = 'personal';
  menuAbierto = false;
  currentRoute: any;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
   }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
