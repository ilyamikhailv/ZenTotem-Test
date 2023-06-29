import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logout-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-icon.component.html',
  styleUrls: ['./logout-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutIconComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logOut();
  }
}
