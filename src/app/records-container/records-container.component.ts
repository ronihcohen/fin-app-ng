import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FamilyService } from "../family.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Subscription } from "rxjs";

@Component({
  selector: "app-records-container",
  templateUrl: "./records-container.component.html",
  styleUrls: ["./records-container.component.scss"]
})
export class RecordsContainerComponent {
  familyID: String;
  isHandset: Boolean;
  userDetailsSubscription: Subscription;

  constructor(
    public afAuth: AngularFireAuth,
    public familyService: FamilyService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isHandset = false;
        if (result.matches) {
          this.isHandset = true;
        }
      });

    this.afAuth.user.subscribe(user => {
      if (!user) {
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        return;
      }
      this.familyID = null;
      this.userDetailsSubscription = this.familyService
        .getUserDetails(user.uid)
        .subscribe(userDetails => {
          if (!userDetails) {
            return (this.familyID = user.uid);
          }
          this.familyID = userDetails.familyID;
        });
    });
  }
}
