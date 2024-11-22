import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  item: Item;
  listId: string;
  spoilers: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService,
  ) {
    this.item = data.item;
    this.listId = data.listId;
    this.spoilers = data.spoilers;
  }

  togglePurchase() {
    this.firebase.purchaseItem(
      this.listId,
      this.item.id!,
      !this.item.purchased,
    );
  }
}
