import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedInGuard } from 'src/app/core/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { profileResolver } from './profile.resolver';
import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { ValidationErrorComponent } from 'src/app/shared/components/validation-error/validation-error.component';
const maskConfig: Partial<IConfig> = {
  validation: false,
  
};
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [userLoggedInGuard],
    title: 'Профиль пользователя',
    resolve: { profile: profileResolver },
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ValidationErrorComponent,
  ],
  providers: [provideEnvironmentNgxMask(maskConfig)],
})
export class ProfileModule {}
