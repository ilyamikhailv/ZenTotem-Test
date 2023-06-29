import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileModel } from '../../core/models/profile.model';
import { AppNotifierService } from 'src/app/core/services/app-notifier.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { AppValidators } from 'src/app/core/utils/app-validators';
import { ProfileForm } from './profile.form';

@Injectable({ providedIn: 'any' })
export class ProfileService {
  constructor(
    private http: HttpClient,
    private notifier: AppNotifierService,
    private fb: NonNullableFormBuilder
  ) {}

  loadProfile(login: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>('/profile', {
      params: new HttpParams({ fromObject: { login } }),
    });
  }

  save(profile: ProfileModel): Observable<ProfileModel> {
    return this.http.post<ProfileModel>('/save', profile).pipe(
      catchError((reason) => {
        this.notifier.error(reason.error);
        return throwError(() => reason);
      })
    );
  }

  getFormGroup(profile: ProfileModel): FormGroup<ProfileForm> {
    return this.fb.group({
      email: new FormControl<string>(profile?.email, {
        validators: [AppValidators.required, AppValidators.email],
      }),
      firstName: new FormControl<string>(profile?.firstName, {
        validators: [AppValidators.required, AppValidators.maxLength(255)],
      }),
      lastName: new FormControl<string>(profile?.lastName, {
        validators: [AppValidators.required, AppValidators.maxLength(255)],
      }),
      phoneNumber: new FormControl<string>(profile?.phoneNumber, {
        validators: [AppValidators.required, AppValidators.maxLength(10)],
      }),
      websiteUrl: new FormControl<string>(profile?.websiteUrl, {
        validators: [],
      }),
    });
  }
}
