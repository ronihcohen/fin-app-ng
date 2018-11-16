import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Subscription } from "rxjs";
import { UserDetailsService } from "../user-details.service";

@Component({
  selector: "app-records-container",
  templateUrl: "./records-container.component.html",
  styleUrls: ["./records-container.component.scss"]
})
export class RecordsContainerComponent {
  familyID: string;
  uid: string;
  isHandset: boolean;
  userDetailsSubscription: Subscription;

  constructor(
    public afAuth: AngularFireAuth,
    breakpointObserver: BreakpointObserver,
    private userDetailsService: UserDetailsService
  ) {
    this.userDetailsService.getUserDetails().subscribe(userDetails => {
      this.familyID = userDetails.familyID;
      this.uid = userDetails.uid;
    });

    breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isHandset = false;
        if (result.matches) {
          this.isHandset = true;
        }
      });
  }
}
