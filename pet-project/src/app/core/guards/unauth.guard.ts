import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userLogOutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loggedIn = inject(AuthService).loggedIn;
  if (loggedIn) {
    inject(Router).navigateByUrl('/');
  }
  return !loggedIn;
};
