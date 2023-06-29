import { Inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  checkValidationForm = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  controlInvalidAndTouched(control: AbstractControl): boolean {
    return control?.invalid && control?.touched && control?.dirty;
  }

  hasControlErrors(control: AbstractControl): boolean {
    return control?.errors !== null && (control?.dirty || control?.touched);
  }

  getFirstControlError(control: AbstractControl): {
    message: string | null;
    params: { [key: string]: any };
  } {
    if (this.hasControlErrors(control)) {
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          const params: object =
            control.errors[key].params ||
            this.convertToObject(control.errors[key].refValues);
          return { message: control.errors[key].message, params };
        }
      }
    }
    return { message: null, params: null };
  }
  private convertToObject(refValues: Array<string | number>): {
    [key: string]: any;
  } {
    const result: { [key: string]: any } = {};
    if (Array.isArray(refValues)) {
      for (let index = 0; index < refValues.length; index++) {
        result[`value${index}`] = refValues[index];
      }
    }
    return result;
  }

  processInvalidFormGroup(formGroup: FormGroup): void {
    if (!formGroup.valid) {
      this.setInvalidToForm(formGroup);
      const element: HTMLElement = this.document.querySelector('.ng-invalid');
      if (element) {
        element.setAttribute('tabindex', '-1');
        element.focus();
        element.removeAttribute('tabindex');
      }
    }
  }

  private setInvalidToForm(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
    for (const key of Object.keys(formGroup.controls)) {
      const control = formGroup.controls[key];
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.setInvalidToForm(control);
      } else if (control instanceof FormArray) {
        const groups = control.controls as Array<FormGroup>;
        for (const group of groups) {
          this.setInvalidToForm(group);
        }
      }
    }
  }
}
