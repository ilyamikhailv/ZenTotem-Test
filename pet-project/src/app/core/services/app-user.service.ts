import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { AppStorageService } from './app-storage.service';

@Injectable({ providedIn: 'root' })
export class AppUserService {
  constructor(private storage: AppStorageService) {}

  private readonly storageKey: string = 'app.user';
  private userSubject: BehaviorSubject<UserModel> =
    new BehaviorSubject<UserModel>(this.userFromStorage);

  readonly user$ = this.userSubject.asObservable();
  store(user: UserModel): void {
    this.storage.set(this.storageKey, user);
    this.userSubject.next(user);
  }
  get userFromStorage(): UserModel {
    return this.storage.get<UserModel>(this.storageKey) ?? null;
  }
  get hasUserInStorage(): boolean {
    return !!this.userFromStorage;
  }
  clearUserFromStorage(): void {
    this.storage.remove(this.storageKey);
  }
}
