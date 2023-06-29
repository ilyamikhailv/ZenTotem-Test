import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { userLogOutGuard } from 'src/app/core/guards/unauth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ControlErrorComponent } from 'src/app/shared/components/control-error/control-error.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [userLogOutGuard],
    title: 'Авторизация',
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ControlErrorComponent
  ]
})
export class AuthModule {}
