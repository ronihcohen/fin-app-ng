import { DataSource } from "@angular/cdk/collections";
import { Observable, Subscription, of } from "rxjs";
import { RecordsService, Record } from "../records.service";
import { Moment } from "moment";
import { combineLatest, startWith } from "rxjs/operators";

export class RecordsDataSource extends DataSource<Record> {
  dataLength: Number;
  totalAmount: Number;
  recordsSubscription: Subscription;

  constructor(
    private date: Moment,
    private records: RecordsService,
    private familyID: String | null,
    private searchChanges$: Observable<string> | null
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Record[]> {
    let records$: Observable<Record[]>;
    let combinedWithSearch$: Observable<Record[]>;

    records$ = of([]);
    if (this.familyID) {
      records$ = this.records.getRecords(this.familyID, this.date);
    }
    combinedWithSearch$ = records$;

    if (this.searchChanges$) {
      combinedWithSearch$ = this.searchChanges$.pipe(
        startWith(""),
        combineLatest(records$, (searchValue, records) => {
          return records.filter(record => record.title.includes(searchValue));
        })
      );
    }

    this.recordsSubscription = combinedWithSearch$.subscribe(data => {
      this.dataLength = data.length;
      this.totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);
    });

    return combinedWithSearch$;
  }
  disconnect() {
    if (this.recordsSubscription) {
      this.recordsSubscription.unsubscribe();
    }
  }
}
