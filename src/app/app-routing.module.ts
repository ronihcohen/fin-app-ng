import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordsContainerComponent } from "./records-container/records-container.component";
import { RecordDetailsComponent } from "./record-details/record-details.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "record/:id",
    component: RecordDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: "", component: RecordsContainerComponent },
  { path: "**", component: RecordsContainerComponent, redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
