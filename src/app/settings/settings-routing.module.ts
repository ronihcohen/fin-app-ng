import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
