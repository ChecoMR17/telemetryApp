import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { AuthGuard } from './auth/auth.guard';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  { path: "login", component:LoginComponentComponent},
  { path: "", redirectTo: "login", pathMatch:"full"},
  {
    path: "telemetry",
    component: LayoutComponentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home",component:HomeComponentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private titleService: Title, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(event.url);
      }
    });
  }


private updatePageTitle(url: string): void {
  let pageTitle = '';
  switch (url) {
    case '/login':
      pageTitle = 'Login';
      break;
    case '/asb/home':
      pageTitle = 'Home';
      break;
  }
  this.titleService.setTitle(pageTitle);
}
}
