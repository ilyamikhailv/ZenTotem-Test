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
    private formValidationService: FormValidationService
  ) {}
  readonly loading = signal<boolean>(false);
  profileForm: FormGroup<ProfileForm> = null;

  save(): void {
    if (this.profileForm.invalid) {
      this.formValidationService.processInvalidFormGroup(this.profileForm);
    } else {
      this.profileService
        .save(this.profileForm.getRawValue())
        .pipe(untilDestroyed(this))
        .subscribe();
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
