import { Routes } from '@angular/router';
import {authGuard, loginGuard} from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then(c => c.LoginComponent),
    // canActivate: [loginGuard]
  },

  {
    path: "admin",
    loadComponent: () => import("./pages/admin/admin.component").then(c => c.AdminComponent),
    loadChildren: () => import("./pages/admin/admin.routes").then(r => r.routes),
    // canActivateChild: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'admin',
  }
];
