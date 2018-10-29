import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsContainerComponent } from './records-container/records-container.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{ path: '', component: RecordsContainerComponent, canActivate: [AuthGuard] }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
