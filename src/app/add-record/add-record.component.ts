import { Component, Input } from "@angular/core";
import { FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { RecordsService } from "../records.service";
import { MatSnackBar } from "@angular/material";

import { UserDetailsService } from "../user-details.service";

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.scss"]
})
export class AddRecordComponent {
  recordForm = this.fb.group({
    title: [null, Validators.required],
    amount: [null, Validators.compose([Validators.required, Validators.min(0)])]
  });
  familyID: string;
  uid: string;
  @Input()
  currentRecord: string;

  constructor(
    private fb: FormBuilder,
    private records: RecordsService,
    public snackBar: MatSnackBar,
    private userDetailsService: UserDetailsService
  ) {
    this.userDetailsService.getUserDetails().subscribe(userDetails => {
      this.familyID = userDetails.familyID;
      this.uid = userDetails.uid;
    });
  }

  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.recordForm.valid) {
      this.currentRecord
        ? this.records.addItem(this.recordForm.value, this.currentRecord)
        : this.records.addRecord(
            this.recordForm.value,
            this.familyID,
            this.uid
          );

      this.recordForm.reset();
      formDirective.resetForm();
      this.snackBar.open("Your record was added successfully.", null, {
        duration: 1500
      });
    }
  }
}
