import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsContainerComponent } from './records-container/records-container.component';

const routes: Routes = [{ path: '', component: RecordsContainerComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
