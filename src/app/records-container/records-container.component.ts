import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FamilyService } from '../family.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public familyService: FamilyService, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.isHandset = false;
      if (result.matches) {
        this.isHandset = true;
      }
    });
  }
  familyID: String;
  isHandset: Boolean;
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

}
