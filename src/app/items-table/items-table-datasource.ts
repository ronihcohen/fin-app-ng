import { DataSource } from "@angular/cdk/collections";
import { MatPaginator, MatSort } from "@angular/material";
import { map } from "rxjs/operators";
import { Observable, Subscription, merge } from "rxjs";
import { ParamMap } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";

export interface ItemsTableItem {
  title: string;
  amount: number;
}

/**
 * Data source for the ItemsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemsTableDataSource extends DataSource<ItemsTableItem> {
  data: ItemsTableItem[] = [];
  items$: Observable<ItemsTableItem[]>;
  itemsSubscription: Subscription;
  recordSubscription: Subscription;
  record: ItemsTableItem;
  recordId: string;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private paramMap: Observable<ParamMap>,
    private afs: AngularFirestore
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ItemsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    this.items$ = this.paramMap.pipe(
      switchMap(params => {
        this.recordId = params.get("id");
        const recordDoc = this.afs.doc<ItemsTableItem>(
          "records/" + this.recordId
        );
        this.recordSubscription = recordDoc
          .valueChanges()
          .subscribe(record => (this.record = record));

        return recordDoc
          .collection<ItemsTableItem>("items")
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })
            )
          );
      })
    );

    this.itemsSubscription = this.items$.subscribe(
      items => (this.data = items)
    );

    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange,
      this.items$
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }

    if (this.recordSubscription) {
      this.recordSubscription.unsubscribe();
    }
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ItemsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ItemsTableItem[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "title":
          return compare(a.title, b.title, isAsc);
        case "amount":
          return compare(+a.amount, +b.amount, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
