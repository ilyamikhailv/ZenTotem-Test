import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ProfileModel } from '../../core/models/profile.model';
import { ProfileService } from './profile.service';
import { AppUserService } from 'src/app/core/services/app-user.service';

export const profileResolver: ResolveFn<ProfileModel> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProfileService).loadProfile(
    inject(AppUserService).userFromStorage.login
  );
};
