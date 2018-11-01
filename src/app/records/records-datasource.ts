import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { RecordsService, Record } from "../records.service";
import { Moment } from "moment";
import { Subscription } from "rxjs";
import { combineLatest, startWith } from "rxjs/operators";

export class RecordsDataSource extends DataSource<Record> {
  dataLength: Number;
  totalAmount: Number;
  recordsSubscription: Subscription;

  constructor(
    private date: Moment,
    private records: RecordsService,
    private familyID: String,
    private searchChanges$: Observable<string>
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Record[]> {
    const records$ = this.records.getRecords(this.familyID, this.date);

    const combinedWithSearch$ = this.searchChanges$.pipe(
      startWith(""),
      combineLatest(records$, (searchValue, records) => {
        return records.filter(record => record.title.includes(searchValue));
      })
    );

    this.recordsSubscription = combinedWithSearch$.subscribe(
      data => {
        this.dataLength = data.length;
        this.totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);
      },
      err => {
        console.log("RecordsDataSource: ", this.familyID, this.date, err);
      }
    );

    return combinedWithSearch$;
  }
  disconnect() {
    if (this.recordsSubscription) {
      this.recordsSubscription.unsubscribe();
    }
  }
}
