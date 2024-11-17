import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
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

  isAmazonUrl(): boolean {
    if (this.item.url) {
      return (
        this.item.url.startsWith('https://www.amazon.com/') &&
        this.item.url.includes('/dp/')
      );
    }

    return false;
  }

  getCamelUrl(): string {
    // Get the item ID from the Amazon URL
    const itemId = this.item.url.split('/dp/')[1].split('/')[0];
    return `https://camelcamelcamel.com/product/${itemId}`;
  }
}
