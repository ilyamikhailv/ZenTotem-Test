import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AuthFormValidationModel } from './auth-form-validation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'any' })
export class AuthLogicService {
  constructor(private formBuilder: RxFormBuilder, private http: HttpClient) {}
  createFormGroup(): FormGroup {
    return this.formBuilder.formGroup(AuthFormValidationModel);
  }
  login(model: AuthFormValidationModel): Observable<any> {
    return this.http.post('/login', model);
  }
}
