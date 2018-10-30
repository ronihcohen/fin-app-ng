import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from '../family.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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

  constructor(private fb: FormBuilder,
    private router: Router,
    private familyService: FamilyService,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar) { }
  uid: string;
  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  onSubmit() {
    if (this.familyForm.valid) {
      this.familyService.updateFamilyID(this.familyForm.value.secret, this.uid).then(res => {
        this.snackBar.open('Your secret was changed successfully.', null, {
          duration: 1500
        });
        this.router.navigate(['/']);
      });
    }
  }
}
