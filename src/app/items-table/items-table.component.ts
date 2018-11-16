import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ItemsTableDataSource } from "./items-table-datasource";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-items-table",
  templateUrl: "./items-table.component.html",
  styleUrls: ["./items-table.component.scss"]
})
export class ItemsTableComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: ItemsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["title", "amount"];

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit() {
    this.dataSource = new ItemsTableDataSource(
      this.paginator,
      this.sort,
      this.route.paramMap,
      this.afs
    );
  }
}
