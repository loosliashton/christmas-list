import { Component, Inject, OnInit } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { CopyToListComponent } from './copy-to-list/copy-to-list.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  item: Item;
  spoilers: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ItemComponent>,
    public dialog: MatDialog,
  ) {
    this.item = data.item;
    this.spoilers = data.spoilers;
  }

  togglePurchase() {
    this.item.purchased = !this.item.purchased;
    this.dialogRef.close(true);
  }

  openCopyToListModal() {
    const dialogRef = this.dialog.open(CopyToListComponent, {
      data: { item: this.item },
      width: '600px',
    });
  }
}
