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
    secret: [null, Validators.compose([
      Validators.required, Validators.minLength(16)])
    ],
  });



  @Input() uid: String;
  @Input() familyID: String;

  constructor(private fb: FormBuilder, private familyService: FamilyService) {

  }

  ngOnInit() {
    this.familyForm.setValue({ 'secret': this.familyID });
  }

  onSubmit() {
    if (this.familyForm.valid) {
      this.familyService.updateFamilyID(this.familyForm.value.secret, this.uid);
    }
  }
}
