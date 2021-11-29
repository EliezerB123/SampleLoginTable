import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { PageTableComponent } from './components/pages/page-table/page-table.component';
import { AuthGuard } from './network/auth-guard.guard';

const routes: Routes = [
  { path: '', component: PageTableComponent,canActivate: [AuthGuard] },
  { path: 'login', component: PageLoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
