import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  familyID: String;
  constructor(public afAuth: AngularFireAuth, public familyService: FamilyService) {
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (!user) {
        return;
      }
      this.familyService.getUserDetails(user.uid).subscribe(userDetails => {
        if (!userDetails) {
          return this.familyID = user.uid;
        }
        this.familyID = userDetails.familyID;
      });
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
