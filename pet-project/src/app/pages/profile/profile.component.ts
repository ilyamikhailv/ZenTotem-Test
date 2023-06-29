import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileForm } from './profile.form';
import { ProfileService } from './profile.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
    private profileService: ProfileService
  ) {}
  readonly loading = signal<boolean>(false);
  profileForm: FormGroup<ProfileForm> = null;
  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe(
        ({ profile }) =>
          (this.profileForm = this.profileService.getFormGroup(profile))
      );
  }
}
