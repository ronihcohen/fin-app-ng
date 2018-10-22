import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent implements OnInit {
  familyForm = this.fb.group({
    id: [null, Validators.required],
  });

  @Input() uid: String;
  @Input() familyID: String;

  constructor(private fb: FormBuilder, private familyService: FamilyService) {

  }

  ngOnInit() {
    this.familyForm.setValue({ 'id': this.familyID || this.uid });
  }

  onSubmit() {
    if (this.familyForm.valid) {
      this.familyService.updateFamilyID(this.familyForm.value.id, this.uid);
    }
  }
}
