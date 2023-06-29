import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { userLoggedInGuard } from 'src/app/core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [userLoggedInGuard],
    title: 'Главная страница',
    children: [
      {
        path: 'inventory',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('../billing/billing.module').then((m) => m.BillingModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, HeaderComponent, RouterModule.forChild(routes)],
})
export class LayoutModule {}
