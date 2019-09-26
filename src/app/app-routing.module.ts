import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {path: '', redirectTo:'taps', pathMatch:'full' },
  {
    path: 'taps', 
    canActivate: [GuardGuard],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'reset-pass', loadChildren: './reset-pass/reset-pass.module#ResetPassPageModule' },
  //{ path: 'detail', loadChildren: './pages/invoice/detail/detail.module#DetailPageModule' },
  //{ path: 'create', loadChildren: './pages/invoice/create/create.module#CreatePageModule' },
  //{ path: 'qoutation', loadChildren: './pages/qoutation/qoutation.module#QoutationPageModule' },
  //{ path: 'invoice', loadChildren: './pages/invoice/invoice.module#InvoicePageModule' },
  //{ path: 'create', loadChildren: './pages/qoutation/create/create.module#CreatePageModule' },
  //{ path: 'detail', loadChildren: './pages/qoutation/detail/detail.module#DetailPageModule' },
  // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  // { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  // { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  // { path: 'account', loadChildren: './account/account.module#AccountPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
