import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { userLoggedInGuard } from 'src/app/core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    canActivate: [userLoggedInGuard],
    title: 'Биллинг',
  },
];

@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BillingModule { }
