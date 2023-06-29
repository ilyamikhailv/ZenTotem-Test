import { Injectable } from '@angular/core';
import { AppUserService } from './app-user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private userService: AppUserService) {}

  get loggedIn(): boolean {
    return this.userService.hasUserInStorage;
  }
}
