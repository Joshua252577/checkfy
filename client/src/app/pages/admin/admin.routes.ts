import {Routes} from "@angular/router";
import {loginGuard} from '../../shared/guards/login.guard';

export const routes: Routes = [
  {
    path: 'customer',
    loadComponent: () => import("./customer/customer.component").then(c => c.CustomerComponent),
    canActivateChild: [loginGuard]
  },

  {
    path: "user",
    loadComponent: () => import("./user/user.component").then(c => c.UserComponent),
    canActivateChild: [loginGuard]
  },

  {
    path: "**",
    redirectTo: "customer",
  }
];
