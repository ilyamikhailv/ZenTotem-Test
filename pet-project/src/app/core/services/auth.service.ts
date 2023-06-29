import { Injectable } from '@angular/core';
import { AppUserService } from './app-user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private userService: AppUserService, private router: Router) {}

  get loggedIn(): boolean {
    return this.userService.hasUserInStorage;
  }

  logOut(): void {
    this.userService.clearUserFromStorage();
    this.router.navigateByUrl('/login');
  }
}
