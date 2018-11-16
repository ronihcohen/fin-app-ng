import { Component, SimpleChanges, Input, OnChanges } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { RecordsDataSource } from "./records-datasource";
import { RecordsService } from "../records.service";
import * as _moment from "moment";
import { Moment } from "moment";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnChanges {
  @Input()
  familyID: string;
  @Input()
  uid: string;
  @Input()
  isHandset: boolean;

  dataSource: RecordsDataSource = new RecordsDataSource(
    _moment(),
    this.records,
    null,
    null
  );
  currentDate: Date;
  displayedColumns: Array<string>;

  searchValue = new FormControl("");

  constructor(
    private records: RecordsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  onFamilyIDChange(familyID: String) {
    this.currentDate = _moment().toDate();
    this.dataSource.disconnect();
    this.dataSource = new RecordsDataSource(
      _moment(),
      this.records,
      familyID,
      this.searchValue.valueChanges
    );
  }

  onViewportChange(isHandset) {
    this.displayedColumns = ["title", "amount", "date"];
    if (isHandset) {
      this.displayedColumns = ["title", "amount"];
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
      this.onViewportChange(viewPortChanges.currentValue);
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

  cloneRecord(row) {
    const { title, amount } = row;
    this.records.addRecord({ title, amount }, this.familyID, this.uid);
    this.snackBar.open("Your record was cloned successfully.", null, {
      duration: 1500
    });
  }

  handleDateChange(date: Moment) {
    this.currentDate = date.toDate();
    this.dataSource = new RecordsDataSource(
      date,
      this.records,
      this.familyID,
      this.searchValue.valueChanges
    );
  }
}
