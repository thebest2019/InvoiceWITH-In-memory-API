import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { GuardGuard } from '../guards/guard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'qoutation',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/qoutation/qoutation.module').then(m => m.QoutationPageModule)
          },
          {
            path: 'create',
            loadChildren: () =>
              import('../pages/qoutation/create/create.module').then(m => m.CreatePageModule)
          },
          {
            path: 'detail',
            loadChildren: () =>
              import('../pages/qoutation/detail/detail.module').then(m => m.DetailPageModule)
          }
        ]
      },
      {
        path: 'invoice',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/invoice/invoice.module').then(m => m.InvoicePageModule)
          },
          {
            path: 'create',
            loadChildren: () =>
              import('../pages/invoice/create/create.module').then(m => m.CreatePageModule)
          },
          {
            path: 'detail',
            loadChildren: () =>
              import('../pages/invoice/detail/detail.module').then(m => m.DetailPageModule)
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/account/account.module').then(m => m.AccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
