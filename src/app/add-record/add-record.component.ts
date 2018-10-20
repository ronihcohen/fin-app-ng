import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecordsService } from '../records.service';

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

  constructor(private fb: FormBuilder, private records: RecordsService) {}
  @Input() uid: String;

  onSubmit() {
    if (this.recordForm.valid) {
      this.records.addRecord(this.recordForm.value, this.uid);
    }
  }
}
