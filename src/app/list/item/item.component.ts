import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { FirebaseService } from 'src/services/firebase.service';

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
    public dialogRef: MatDialogRef<ItemComponent>
  ) {
    this.item = data.item;
    this.spoilers = data.spoilers;
  }

  togglePurchase() {
    this.item.purchased = !this.item.purchased;
    this.dialogRef.close(true);
  }
}
