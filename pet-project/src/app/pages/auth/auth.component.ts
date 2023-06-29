import { FormGroup, FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { AuthLogicService } from './auth-logic.service';
import { AuthFormValidationModel } from './auth-form-validation.model';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { AppNotifierService } from 'src/app/core/services/app-notifier.service';
import { AppUserService } from 'src/app/core/services/app-user.service';
import { Router } from '@angular/router';
@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnDestroy {
  constructor(
    private authLogicService: AuthLogicService,
    private userService: AppUserService,
    private formValidationService: FormValidationService,
    private router: Router,
    private notifier: AppNotifierService
  ) {}

  readonly loading = signal<boolean>(false);
  authForm: FormGroup = this.authLogicService.createFormGroup();

  getControl(name: keyof AuthFormValidationModel): FormControl {
    return this.authForm.get(name) as FormControl;
  }
  submit(): void {
    if (this.authForm.valid) {
      this.loading.set(true);
      this.authLogicService
        .login(this.authForm.value)
        .pipe(
          untilDestroyed(this),
          tap(() => this.loading.set(false)),
          tap((user) => this.userService.store(user))
        )
        .subscribe({
          next: (resp) => {
            this.router.navigateByUrl('/');
          },
          error: (reason) => {
            console.log(reason);
            this.loading.set(false);
            this.notifier.error(reason.error);
          },
        });
    } else {
      this.formValidationService.processInvalidFormGroup(this.authForm);
    }
  }
  ngOnDestroy(): void {
    this.notifier.closeAll();
  }
}
