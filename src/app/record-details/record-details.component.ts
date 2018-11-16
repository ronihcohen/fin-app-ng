import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.component.html",
  styleUrls: ["./record-details.component.scss"]
})
export class RecordDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  recordID$: Observable<string>;
  ngOnInit() {
    this.recordID$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get("id"))
    );

    // this.record$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     console.log(params.get("id"));
    //     return of[1];
    //   })
    // );
  }
}
