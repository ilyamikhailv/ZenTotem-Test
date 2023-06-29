import { switchMap } from 'rxjs/operators';
import { tap, timer } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LogoutIconComponent } from './logout-icon/logout-icon.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { HeaderMessageService } from 'src/app/core/services/header-message.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';

@UntilDestroy()
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    UserDetailComponent,
    LogoutIconComponent,
    NavigationMenuComponent,
    ProfileIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private headerMessageService: HeaderMessageService) {}
  readonly message = signal<string>(null);
  ngOnInit(): void {
    this.headerMessageService.message$
      .pipe(
        untilDestroyed(this),
        tap((text) => this.message.set(text)),
        switchMap(() => timer(30 * 1000)),
        tap(() => this.message.set(null))
      )
      .subscribe();
  }
}
