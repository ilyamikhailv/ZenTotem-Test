import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedInGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    canActivate: [userLoggedInGuard],
    title: 'Inventory',
  },
];

@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
