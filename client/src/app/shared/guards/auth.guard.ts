import {CanActivateChildFn, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateChildFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticated: boolean = await authService.authenticate();

  if (!authenticated) {
    await router.navigate(["login"]);
    return false;
  }

  return true;
};

export const loginGuard: CanActivateFn = async (route, state) => {
  debugger
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticated: boolean = await authService.authenticate();

  if (authenticated) {
    await router.navigate([""]);
    return false;
  }

  return true;
}
