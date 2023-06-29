import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedInGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [userLoggedInGuard],
    title: 'Отчёты',
  },
];

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReportsModule {}
