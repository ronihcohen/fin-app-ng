import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.component.html",
  styleUrls: ["./record-details.component.scss"]
})
export class RecordDetailsComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}
  recordID$: Observable<string>;
  currentRecord: string;
  recordIdSubscription: Subscription;

  ngOnInit() {
    this.recordID$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get("id"))
    );

    this.recordIdSubscription = this.recordID$.subscribe(
      currentRecord => (this.currentRecord = currentRecord)
    );
  }

  ngOnDestroy() {
    this.recordIdSubscription.unsubscribe();
  }
}
