import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule
} from "@angular/material";

import { SettingsRoutingModule } from "./settings-routing.module";
import { FamilyFormComponent } from "../family-form/family-form.component";

@NgModule({
  declarations: [FamilyFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SettingsModule {}
