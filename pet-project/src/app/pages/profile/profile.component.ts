import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileForm } from './profile.form';
import { ProfileService } from './profile.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { HeaderMessageService } from 'src/app/core/services/header-message.service';
@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private formValidationService: FormValidationService,
    private headerMessageService: HeaderMessageService
  ) {}
  readonly loading = signal<boolean>(false);
  profileForm: FormGroup<ProfileForm> = null;

  save(): void {
    if (this.profileForm.invalid) {
      this.formValidationService.processInvalidFormGroup(this.profileForm);
    } else {
      this.loading.set(true);
      this.profileService
        .save(this.profileForm.getRawValue())
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.headerMessageService.updateMessage(
              'Изменение профиля прошло успешно'
            );
            this.loading.set(false);
          },
          error: (reason) => this.loading.set(false),
        });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe(
        ({ profile }) =>
          (this.profileForm = this.profileService.getFormGroup(profile))
      );
  }
}
