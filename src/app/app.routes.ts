import { Routes } from '@angular/router';
import { PaymentsPageComponent } from './ui/pages/payments-page/payments-page.component';

export const routes: Routes = [
  {
    path: ':provider/:context',
    component: PaymentsPageComponent,
  },
  {
    path: '',
    redirectTo: '/i18n/payroll',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/i18n/payroll',
  },
];
