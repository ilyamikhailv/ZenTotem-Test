import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LogoutIconComponent } from './logout-icon/logout-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserDetailComponent, LogoutIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
