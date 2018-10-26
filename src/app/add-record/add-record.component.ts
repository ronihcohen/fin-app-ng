import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { RecordsService } from '../records.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent {
  recordForm = this.fb.group({
    title: [null, Validators.required],
    amount: [null, Validators.compose([
      Validators.required, Validators.min(0)])
    ],
  });

  constructor(private fb: FormBuilder, private records: RecordsService, public snackBar: MatSnackBar) { }
  @Input() familyID: String;

  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.recordForm.valid) {
      this.records.addRecord(this.recordForm.value, this.familyID);
      this.recordForm.reset();
      formDirective.resetForm();
      this.snackBar.open('Your record was added successfully, Thank you!', null, {
        duration: 1500
      });
    }
  }
}
