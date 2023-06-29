import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserService } from 'src/app/core/services/app-user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  constructor(private userService: AppUserService) {}
  readonly userName$ = this.userService.user$.pipe(
    map((user) =>
      [user?.lastName, user?.name, user?.middleName]
        .filter((i) => !!i)
        .join(' ')
    )
  );
}
