import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyFormComponent } from '../family-form/family-form.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: 'settings', component: FamilyFormComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
