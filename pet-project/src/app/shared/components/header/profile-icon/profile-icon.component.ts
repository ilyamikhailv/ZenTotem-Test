import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileIconComponent {

}
