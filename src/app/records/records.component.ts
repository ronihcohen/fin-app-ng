import { Component, SimpleChanges, Input, OnChanges } from "@angular/core";
import { MatDialog } from "@angular/material";
import { RecordsDataSource } from "./records-datasource";
import { RecordsService } from "../records.service";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from "moment";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnChanges {
  @Input()
  familyID: String;
  @Input()
  isHandset: Boolean;

  dataSource: RecordsDataSource;
  currentDate: Date;
  displayedColumns: Array<string>;

  constructor(private records: RecordsService, public dialog: MatDialog) {}

  onFamilyIDChange(familyID: String) {
    this.currentDate = _moment().toDate();
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.dataSource = new RecordsDataSource(_moment(), this.records, familyID);
  }

  onViewportChange() {
    this.displayedColumns = ["title", "amount", "date", "delete"];
    if (this.isHandset) {
      this.displayedColumns = ["title", "amount", "delete"];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const familyIDChanges = changes["familyID"];
    if (
      familyIDChanges &&
      familyIDChanges.currentValue !== familyIDChanges.previousValue
    ) {
      this.onFamilyIDChange(familyIDChanges.currentValue);
    }

    const viewPortChanges = changes["isHandset"];
    if (
      viewPortChanges &&
      viewPortChanges.currentValue !== viewPortChanges.previousValue
    ) {
      this.onViewportChange();
    }
  }

  handleDeleteClick(row) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(approved => {
      if (approved) {
        this.records.deleteRecord(row.id);
      }
    });
  }

  handleDateChange(date: Moment) {
    this.currentDate = date.toDate();
    this.dataSource = new RecordsDataSource(date, this.records, this.familyID);
  }
}
